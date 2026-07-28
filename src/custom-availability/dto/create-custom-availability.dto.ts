import {
  IsDateString,
  IsString,
  Matches,
} from 'class-validator';

export class CreateCustomAvailabilityDto {
  @IsDateString()
  date!: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  startTime!: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  endTime!: string;
}