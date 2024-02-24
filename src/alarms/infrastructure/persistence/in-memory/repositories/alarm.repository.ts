import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';
import { AlarmEntity } from '../entities/alarm.entity';

import { AlarmMapper } from '../mappers/alarm.mappers';
import { Alarm } from '../../../../domain/alarm';
import { Injectable } from '@nestjs/common';
import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm-read.model';

@Injectable()
export class InMemoryAlarmRepository
  implements
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository
{
  private readonly alarms = new Map<string, AlarmEntity>();
  private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();

  constructor() {
    // pre-populate with some data
    // this.alarms.set('1', { id: '1', name: 'Alarm 1', severity: 'medium' });
    // this.alarms.set('2', { id: '2', name: 'Alarm 2', severity: 'low' });
  }

  async findAll(): Promise<AlarmReadModel[]> {
    return Array.from(this.materializedAlarmViews.values());
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }

  async upsert(
    alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>,
  ): Promise<void> {
    if (this.materializedAlarmViews.has(alarm.id)) {
      this.materializedAlarmViews.set(alarm.id, {
        ...this.materializedAlarmViews.get(alarm.id),
        ...alarm,
      });
      return;
    }

    this.materializedAlarmViews.set(alarm.id, alarm as AlarmReadModel);
  }
}
