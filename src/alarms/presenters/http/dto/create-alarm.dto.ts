import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlarmDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  severity: string;

  // TODO: add validation for properties
  triggeredAt: Date;

  items: Array<{ name: string; type: string }>;
}
