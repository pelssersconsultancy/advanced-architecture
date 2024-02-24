import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarms.repository';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmsRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  async findAll() {
    return await this.alarmModel.find();
  }
}
