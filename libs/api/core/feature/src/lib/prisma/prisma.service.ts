import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { RequestContext } from '../context/request-context.model';
import { User } from '../models/user.model';

/**
 * Extension of the PrismaClient for use with NestJs.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {
    /**
     * Get the database url from environmental variables and pass it in.
     */
    super({
      datasources: {
        db: {
          url: configService.get<string>('database.url')
        }
      }
    });
  }

  /**
   * Connect to the database when the module is initialized.
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.$use(async (params, next) => {
      if (
        params.action === 'create' ||
        params.action === 'createMany' ||
        params.action === 'update' ||
        params.action === 'updateMany'
      ) {
        const currentDate = new Date();
        const user: User = RequestContext.currentContext.req['user'];

        if (params.action === 'create' || params.action === 'createMany') {
          params.args.data['createdAt'] = currentDate;
          params.args.data['createdBy'] = user.sub;
        }

        params.args.data['updatedAt'] = currentDate;
        params.args.data['updatedBy'] = user.sub;
      }
      const result = await next(params);

      return result;
    });
  }

  /**
   * Disconnect from the database when the application is shutting down.
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  // /**
  //  * A utility function used to clear all database rows for testing.
  //  */
  // clearDatabase() {
  //   const modelNames = Prisma.dmmf.datamodel.models.map(model => model.name);

  //   return Promise.all(
  //     modelNames.map(modelName =>
  //       this[modelName[0].toLowerCase() + modelName.slice(1)].deleteMany(),
  //     ),
  //   );
  // }
}
