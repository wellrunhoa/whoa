import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly config: ConfigService
  ) {}

  async create(userDto: CreateUserDTO): Promise<UserDTO> {
    const user = CreateUserDTO.MODEL_CONVERTER.toModel(userDto);
    const plaintextPassword = userDto.password;

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(
      plaintextPassword,
      this.config.get<number>('BCRYPT_SALT_ROUNDS')
    );

    user.hashedPassword = hashedPassword;

    // Create new user record
    const newUser = await this.userRepository.save(user);

    return CreateUserDTO.MODEL_CONVERTER.toDTO(newUser);
  }

  async getById(id: string): Promise<UserDTO | undefined> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`No user with id ${id}`);
    }

    return UserDTO.MODEL_CONVERTER.toDTO(user);
  }

  async getByEmail(email: string): Promise<UserDTO | undefined> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return UserDTO.MODEL_CONVERTER.toDTO(user);
    }
    throw new NotFoundException(`No User with email ${email}`);
  }

  async validateUser(email: string, givenPassword: string): Promise<UserDTO | undefined> {
    const user = await this.userRepository.findOne({ email });

    if (user) {
      const passwordsMatch = await bcrypt.compare(givenPassword, user.hashedPassword);

      if (passwordsMatch) {
        return UserDTO.MODEL_CONVERTER.toDTO(user);
      }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDTO): Promise<UserDTO> {
    // TODO: Consider user repository update() method

    const user = await this.userRepository.findOne(id);

    if (user) {
      const updatedUser = UpdateUserDTO.MODEL_CONVERTER.toModel(updateUserDto);

      const savedUser = await this.userRepository.save(user);

      return savedUser;
    }
  }

  async all(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();

    return users.map((user) => UserDTO.MODEL_CONVERTER.toDTO(user));
  }
}
