import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';

import { RecurringAvailabilityService } from './recurring-availability.service';
import { CreateRecurringAvailabilityDto } from './dto/create-recurring-availability.dto';
import { UpdateRecurringAvailabilityDto } from './dto/update-recurring-availability.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.DOCTOR)

@Controller('doctor/availability')
export class RecurringAvailabilityController {
  constructor(
    private readonly recurringAvailabilityService: RecurringAvailabilityService,
  ) {}

  @Post()
create(
  @Req() req: Request,
  @Body() dto: CreateRecurringAvailabilityDto,
) {
  console.log(req.user);
  const userId = (req.user as { userId: string }).userId;
  return this.recurringAvailabilityService.create(userId, dto);
}

  @Get()
  findAll() {
    return this.recurringAvailabilityService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRecurringAvailabilityDto,
  ) {
    return this.recurringAvailabilityService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recurringAvailabilityService.remove(id);
  }
}