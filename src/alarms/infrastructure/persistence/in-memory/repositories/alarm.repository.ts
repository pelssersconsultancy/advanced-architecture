import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { AlarmEntity } from '../entities/alarm.entity';

import { AlarmMapper } from '../mappers/alarm.mappers';
import { Alarm } from '../../../../domain/alarm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>();

  constructor() {
    // pre-populate with some data
    this.alarms.set('1', { id: '1', name: 'Alarm 1', severity: 'medium' });
    this.alarms.set('2', { id: '2', name: 'Alarm 2', severity: 'low' });
  }

  async findAll(): Promise<Alarm[]> {
    const entities = Array.from(this.alarms.values());
    return entities.map((entity) => AlarmMapper.toDomain(entity));
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }
}
