import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DicesService } from './dices.service';
import { CreateDiceDto } from './dto/create-dice.dto';
import { DiceDto } from './dto/dice.dto';
import { UpdateDiceDto } from './dto/update-dice.dto';

@Controller('dices')
@ApiTags('Dices')
export class DicesController {
  constructor(private readonly dicesService: DicesService) { }

  @Post()
  @ApiBody({ type: CreateDiceDto })
  create(@Body() createDiceDto: DiceDto) {
    return this.dicesService.create(createDiceDto);
  }

  @Get()
  findAll() {
    return this.dicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiceDto: UpdateDiceDto) {
    return this.dicesService.update(+id, updateDiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dicesService.remove(+id);
  }
}
