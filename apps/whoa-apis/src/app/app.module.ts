import { Module } from '@nestjs/common';
import { ApiSharedModule } from "@whoa/api/shared/feature";
import { ApiHoaBoardModule } from "@whoa/api/hoa-board/feature";

@Module({
  imports: [ApiSharedModule, ApiHoaBoardModule],
  controllers: [],
  providers: []
})
export class AppModule {}
