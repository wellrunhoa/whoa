import { Module } from '@nestjs/common';
import { ApiCoreModule } from '@whoa/api/core/feature';
import { ApiHoaBoardModule } from '@whoa/api/hoa-board/feature';
import { ApiDocumentsModule } from "@whoa/api/documents/feature";

@Module({
  imports: [ApiCoreModule, ApiHoaBoardModule, ApiDocumentsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
