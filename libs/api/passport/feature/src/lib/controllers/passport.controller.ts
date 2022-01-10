import { Body, Controller, Logger } from '@nestjs/common';
import { ApiGetOne, ApiPost } from '@whoa/api/core/feature';
import { Observable } from 'rxjs';
import { UserDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('passport')
export class PassportController {
  private readonly logger = new Logger(PassportController.name);

  constructor(private service: UsersService) {}

  @ApiPost(UserDTO, 'user')
  //@Scopes('manage')
  update(@Body() boardDto: UserDTO): Observable<UserDTO> {
    return this.service.updateUser(boardDto);
  }

  @ApiGetOne(UserDTO, 'user')
  //@Scopes('view')
  findById(): Observable<UserDTO> {
    this.logger.debug('findbyid');
    return this.service.getUser();
  }
}
