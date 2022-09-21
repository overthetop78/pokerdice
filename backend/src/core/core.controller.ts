import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { get } from 'http';
import { CoreService } from './core.service';
import { CreateCoreDto } from './dto/create-core.dto';
import { UpdateCoreDto } from './dto/update-core.dto';

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

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

  @Get('Game/CheckRunGame/:lobbyId')
  @ApiParam({ name: 'lobbyId', type: Number })
  CheckRunGame(@Param('lobbyId') lobbyId: string) {
    return this.coreService.CheckRunGame(+lobbyId);
  }

  @Post('Game/RandomListPlayer')
  @ApiBody({ type: [Number] })
  RandomListPlayer(@Body() lobbyUsersId: number[]) {
    return this.coreService.RandomListPlayer(lobbyUsersId);
  }

  @Get('Game/FirstLaunch/:lobbyUserId')
  @ApiParam({ name: 'lobbyUserId', type: Number })
  FirstLaunch(@Param('lobbyUserId') lobbyUserId: string) {
    return this.coreService.FirstLaunchDices(+lobbyUserId);
  }

  @Patch('Game/UpdateDices/:lobbyUserId')
  @ApiParam({ name: 'lobbyUserId', type: Number })
  @ApiBody({ type: [Number] })
  UpdateDices(@Param('lobbyUserId') lobbyUserId: string, @Body() dices: number[]) {
    return this.coreService.SecondLaunchDices(+lobbyUserId, dices);
  }

}
