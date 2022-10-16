import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { DiceDto } from '../dices/dto/dice.dto';
import { CoreService, MyDice } from './core.service';
import { CoreDiceDto } from './dto/core-dice.dto';
import { CreateCoreDto } from './dto/create-core.dto';
import { UpdateCoreDto } from './dto/update-core.dto';

@Controller('core')
@ApiTags('Core')
export class CoreController {
  constructor(private readonly coreService: CoreService) { }

  @Post()
  create(@Body() createCoreDto: CreateCoreDto) {
    return this.coreService.create(createCoreDto);
  }

  @Get()
  findAll() {
    return this.coreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoreDto: UpdateCoreDto) {
    return this.coreService.update(+id, updateCoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coreService.remove(+id);
  }

  @Get('Game/StartGame/:lobbyId')
  StartGame(@Param('lobbyId') lobbyId: number): Promise<String | Error | number[]> {
    return this.coreService.StartGame(lobbyId);
  }

  @Get('Game/FirstLaunch/:lobbyUserId')
  @ApiParam({ name: 'lobbyUserId', type: Number })
  FirstLaunch(@Param('lobbyUserId') lobbyUserId: string): Promise<MyDice[]> {
    return this.coreService.FirstLaunchDices(+lobbyUserId);
  }

  @Patch('Game/UpdateDices',)
  @ApiBody({ type: MyDice })
  UpdateDice(
    @Body() dice: MyDice,
  ) {
    return this.coreService.updateDices(dice);
  }

  @Get('Game/SecondLaunch/:lobbyUserId')
  @ApiParam({ name: 'lobbyUserId', type: Number })
  SecondLaunch(
    @Param('lobbyUserId') lobbyUserId: number,
  ) {
    return this.coreService.SecondLaunchDices(+lobbyUserId);
  }

  @Post('Game/CalculateDices/:lobbyUserId')
  @ApiParam({ name: 'lobbyUserId', type: Number })
  @ApiBody({ type: [CoreDiceDto] })
  CalculateDices(@Param('lobbyUserId') lobbyUserId: number, @Body() dices: CoreDiceDto[]) {
    return this.coreService.CalculateDices(lobbyUserId, dices);
  }

  @Get('Game/CalculateScore/:lobbyId')
  @ApiParam({ name: 'lobbyId', type: Number })
  CalculateScore(@Param('lobbyId') lobbyId: number) {
    return this.coreService.CalculateScore(lobbyId);
  }

}
