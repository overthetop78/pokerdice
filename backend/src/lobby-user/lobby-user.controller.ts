import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LobbyUserService } from './lobby-user.service';
import { CreateLobbyUserDto } from './dto/create-lobby-user.dto';
import { UpdateLobbyUserDto } from './dto/update-lobby-user.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ValidPlay } from './dto/lobby-user.dto';

@Controller('lobby-user')
@ApiTags('LobbyUser')
export class LobbyUserController {
  constructor(private readonly lobbyUserService: LobbyUserService) { }

  @Post()
  create(@Body() createLobbyUserDto: CreateLobbyUserDto) {
    return this.lobbyUserService.create(createLobbyUserDto);
  }

  @Get()
  findAll() {
    return this.lobbyUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lobbyUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLobbyUserDto: UpdateLobbyUserDto,
  ) {
    return this.lobbyUserService.update(+id, updateLobbyUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lobbyUserService.remove(+id);
  }

  @Patch(':id/:validPlay')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiParam({ name: 'validPlay', type: 'enum', enum: ValidPlay })
  updateValidPlay(@Param('id') id: number, @Param('validPlay') validPlay: ValidPlay) {
    return this.lobbyUserService.updateValidPlay(+id, validPlay);
  }
}
