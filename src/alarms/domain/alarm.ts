import { AlarmItem } from './alarm-item';
import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm {
  public triggeredAt: Date;
  public isAcknowledged: boolean;
  public items = new Array<AlarmItem>();
  public name: string;
  public severity: AlarmSeverity;

  constructor(public readonly id: string) {}

  acknowledge() {
    this.isAcknowledged = true;
  }

  addAlarmItem(item: AlarmItem) {
    this.items.push(item);
  }
}
