import { PartialType } from '@nestjs/swagger';
import { CreateDiceDto } from './create-dice.dto';

export class UpdateDiceDto extends PartialType(CreateDiceDto) {}
