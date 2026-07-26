import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @IsNotEmpty()
  @IsString()
  specialization!: string;

  @IsNumber()
  @Min(0)
  experienceYears!: number;

  @IsNotEmpty()
  @IsString()
  qualification!: string;

  @IsNumber()
  @Min(0)
  consultationFee!: number;

  @IsNotEmpty()
  @IsString()
  availabilityHours!: string;

  @IsOptional()
  @IsString()
  profileDetails?: string;
}
