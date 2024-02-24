import { Injectable } from '@nestjs/common';

import { CreateAlarmCommand } from './commands/create-alarm.command';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Alarm } from '../domain/alarm';
import { GetAlarmsQuery } from './queries/get-alarms.query';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createAlarmCommand: CreateAlarmCommand): Promise<Alarm> {
    return this.commandBus.execute(createAlarmCommand);
  }

  findAll() {
    return this.queryBus.execute(new GetAlarmsQuery());
  }
}
