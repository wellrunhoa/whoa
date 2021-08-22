import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';

interface ISwaggerMethod {
  get: (attr: string) => string;
}

export class Swagger {
  static getOperationsSorter() {
    return (a: ISwaggerMethod, b: ISwaggerMethod) => {
      const methodsOrder = ['get', 'post', 'put', 'patch', 'delete', 'options', 'trace'];
      let result = methodsOrder.indexOf(a.get('method')) - methodsOrder.indexOf(b.get('method'));

      if (result === 0) {
        result = a.get('path').localeCompare(b.get('path'));
      }

      return result;
    };
  }

  static async addSwagger(app: INestApplication, config: ConfigService) {
    const options = new DocumentBuilder()
      .setTitle(config.get<string>('application.name'))
      .setDescription(config.get<string>('application.description'))
      .setVersion(config.get<string>('application.version'))
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(config.get<string>('application.swaggerPath'), app, document, {
      customSiteTitle: config.get<string>('application.name'),
      swaggerOptions: {
        docExpansion: 'none',
        apisSorter: 'alpha',
        operationsSorter: Swagger.getOperationsSorter()
      }
    });
  }
}
