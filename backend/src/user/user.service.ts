import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    createUserDto.birthday = new Date(createUserDto.birthday);
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
    }
    const userMerged = Object.assign(await user, updateUserDto);
    return this.userRepository.save(userMerged);
  }

  async remove(id: number) {
    const user = this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return this.userRepository.remove(await user);
  }
}
