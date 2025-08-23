import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModuleModule } from '../mail/mail-module.module';

@Module({
  imports : [ScheduleModule.forRoot(),MailModuleModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports : [TasksService]
})
export class TasksModule {}
