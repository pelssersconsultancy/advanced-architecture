import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './entities/alarm.entity';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { OrmAlarmRepository } from './repositories/alarm.repository';
import { AlarmItemEntity } from './entities/alarm-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity])],
  providers: [
    {
      provide: AlarmRepository,
      useClass: OrmAlarmRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class OrmAlarmPersistenceModule {}
