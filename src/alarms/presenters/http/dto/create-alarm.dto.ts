import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlarmDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  severity: string;
}
