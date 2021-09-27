import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { RequestContext } from 'nestjs-request-context';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BaseEntity } from '../abstracts';
import { User } from '../user.model';

@Injectable()
@EventSubscriber()
export class CustomEntitySubscriber implements EntitySubscriberInterface {
  constructor(
    @InjectConnection() readonly connection: Connection
  ) {
    connection.subscribers.push(this);
  }

  beforeInsert(event: InsertEvent<BaseEntity>) {
    console.log('(********)');
    console.log(RequestContext.currentContext.req["user"]);
    // called before insert
     const user: User = RequestContext.currentContext.req["user"];
     Logger.log('subscriber: '+user.email);
    
     event.entity.createdBy = user.email;
     event.entity.createdAt = new Date();
     event.entity.lastChangeBy = user.email;
     event.entity.lastChangeAt = event.entity.createdAt;
  }

  beforeUpdate?(event: UpdateEvent<BaseEntity>) {
    
    // const user: User = RequestContext.currentContext.req["user"];
    // event.entity.lastChangeBy = user.email;
    // event.entity.lastChangeAt = new Date();
  }
}
