import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ApiCoreModule, FileHelper } from '@whoa/api/core/feature';
import { diskStorage } from 'multer';
import { DocumentController } from './controllers/document.controller';
import { DocumentService } from './services/document.service';

@Module({
  imports: [
    ApiCoreModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // Enable file size limits
        // limits: {
        //   fileSize: configService.get<number>('MAX_FILE_SIZE')
        // }
        storage: diskStorage({
          destination: (req, file, cb) =>
            FileHelper.destinationPath(
              configService.get('environment.uploadLocation'),
              req,
              file,
              cb
            ),
          filename: (req, file, cb) =>
            FileHelper.customFileName(
              configService.get('environment.uploadLocation'),
              req,
              file,
              cb
            )
        })
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: []
})
export class ApiDocumentsModule {}
