import { Controller, Logger } from '@nestjs/common';
import {
    Cron,
    CronExpression,
    Interval,
    Timeout,
} from '@nestjs/schedule';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController{
  constructor(readonly taskService : TasksService){}
  private readonly logger = new Logger(TasksController.name);


  // @Cron(CronExpression.EVERY_MINUTE)
  // handleEveryMinute() {
  //   this.logger.debug('Called every minute');
  // }

  // @Cron('0 1 * * *')
  // handleDailyAtFive() {
  //   this.logger.log('Daily job at 1 AM');
  // }


  // @Interval(10_000)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  // @Timeout(20_000)
  // handleTimeout(request : Request) {
  //       this.logger.debug('Called after 20 seconds');

  // }

}