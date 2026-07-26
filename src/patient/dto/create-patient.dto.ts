import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @IsNumber()
  @Min(0)
  age!: number;

  @IsNotEmpty()
  @IsString()
  gender!: string;

  @IsNotEmpty()
  @IsString()
  contactNumber!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  healthInfo?: string;
}
