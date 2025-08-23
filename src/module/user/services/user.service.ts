import { Injectable } from '@nestjs/common';
import { RequestUserDto } from '../dto/user/request-user.dto';
import { ResponseUserDto } from '../dto/user/response-user.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { AllreadyExists } from 'src/common/exceptions/existException.exception';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { NotFoundErr } from 'src/common/exceptions/notFoundException.exception';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { paramDto } from 'src/common/dto/params.dto';
import { feildDto } from 'src/common/dto/feildDto.dto';
import { EFilterOperation } from 'src/common';
import { RoleRepository } from 'src/module/auth/repository/roles.reposiory';
import { EOrder } from 'src/common/filtering';
import { MailService } from 'src/module/mail/mail-service.service';
import { EmailDto } from '../dto/user/email-user.dto';
import * as dotenv from "dotenv"
import { JwtService } from '@nestjs/jwt';
import { BadRequest } from 'src/common/exceptions/badRequestExecption';
dotenv.config()

@Injectable()
export class UserService {
  constructor(
    private readonly UserRepo: UserRepository,
    private readonly RoleRepo: RoleRepository,
    private readonly mailService: MailService,
    private readonly jwtService : JwtService,
    @InjectMapper() readonly mapper: Mapper,
  ) {}

  async register(RequestUserDto: RequestUserDto): Promise<ResponseUserDto> {
    const existingUser = await this.UserRepo.existAsync({
      email: RequestUserDto.email,
    });
    console.log(RequestUserDto);
    if (existingUser) {
      console.log('object');
      throw new AllreadyExists('User already exists with this email');
    }
    const hashPassword = await bcrypt.hashSync(RequestUserDto.password, 10);
    RequestUserDto.password = hashPassword;

    const role = await this.RoleRepo.getAsync(1);
    if (role) {
      RequestUserDto.role = role;
    }
    const user = await this.UserRepo.createAsync(RequestUserDto);
    return user;
  }

  async getUserProfile(payload: { email: string; } ): Promise<ResponseUserDto[]> {
    const email = payload.email;
    const user = await this.UserRepo.getWithAsync({
      relations: ['profile', 'posts', 'comments','role'],
      email: email,
    });
    // console.log(this.mapper.mapArrayAsync(user, User, ResponseUserDto));
    if (user.length === 0) {
      throw new NotFoundErr(`User Not Found!!!`);
    }
    return this.mapper.mapArrayAsync(user, User, ResponseUserDto);
  }

  async remove(payload : {email : string}): Promise<string> {
    const email = payload.email;
    const user = await this.UserRepo.allAsync({ email: email });
    if (user.length > 0) {
      const deletedUser = await this.UserRepo.deleteAsync(user[0].id);
    } else {
      throw new NotFoundErr(`User not found!!!`);
    }
    return `Your account has been deleted!!! Please Register again`;
  }

  async updateUser(
    payload : {email :string},
    UpdateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const email = payload.email;
    const user = await this.UserRepo.allAsync({ email: email });
    // const hashPassword = await bcrypt.hash(UpdateUserDto.password, 10);

    if (user.length > 0) {
      UpdateUserDto.id = user[0].id;
      UpdateUserDto.password = user[0].password;
      const userProfile = await this.UserRepo.updateAsync(UpdateUserDto);
      return userProfile;
    }
    throw new NotFoundErr('User not found!!!');
  }

  async getAllUser(): Promise<ResponseUserDto[]> {
    const filter =await this.UserRepo.FilterGenerate("role","User",EFilterOperation.Equals);
    //@ts-ignore
    const users = await this.UserRepo.allAsync({role : filter , $orderBy:'updateAt',$order : EOrder.Desc });
    if (users.length > 0) {
      return users;
    }
    throw new NotFoundErr(`No User Founds!!`);
  }

  async getUserById(paramDto: paramDto) {
    const user = await this.UserRepo.getWithAsync({
      relations : ['profile' , 'posts','comments'],
      id : paramDto.id
    });
    if (user.length === 0) {
      throw new NotFoundErr(`User not Found!!!`);
    }
    return user;
  }

  async findByField(
    feildDto: feildDto,
    value: string,
  ): Promise<ResponseUserDto[]> {
    let user: ResponseUserDto[];
    const filterOp = await this.UserRepo.FilterGenerate(
      feildDto.feild,
      value,
      EFilterOperation.ILike,
    );

    user = await this.UserRepo.allAsync(filterOp);
    if (user.length > 0) {
      console.log(user);
      return user;
    }
    throw new NotFoundErr(`User not Found with this ${feildDto.feild}!!!`);
  }


    async removeById(paramDto : paramDto): Promise<string> {
      console.log(typeof paramDto.id);
    const user = await this.UserRepo.existAsync({ id : Number(paramDto.id )});
    console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",user);
    if (!user) {
      throw new NotFoundErr(`User not found!!!`);
    } else {
      const deletedUser = await this.UserRepo.deleteAsync(paramDto.id);
    }
    return `Your account has been deleted!!! Please Register again`;
  }

  async sendMail(EmailDto : EmailDto){
    const user = await this.UserRepo.allAsync({email : EmailDto.email});
    if(user.length === 0){
      throw new NotFoundErr('Email is Wrong Try again');
    }else{
      const link = process.env.FRONTENDURL
      const token =this.jwtService.sign({ email: EmailDto.email, password: user[0].password })
      this.mailService.send({to : EmailDto.email , subject : 'Reset Password' ,
         message : 'Password reset link(link will be valid for 24h and can be used only once)' ,
          link : `${link}/reset-password/?token=${token}`})
    }
    return "mail sended";
  }

  async resetPassword(EmailDto : EmailDto){
    
    const decoded =await this.jwtService.verify(EmailDto.token , {
      secret : process.env.JWT_SECRET
    })
    const user = await this.UserRepo.allAsync({email : decoded.email});
    if(decoded.password !== user[0].password){
      throw new BadRequest("Invalid Url")
    }
    if(user.length === 0){
      throw new NotFoundErr('User Not Found');
    }else{
      user[0].password = await bcrypt.hash(EmailDto.password,10);
      const updatePass = await this.UserRepo.createAsync(user[0])
    
    return "password updated";
    }
  }

}
