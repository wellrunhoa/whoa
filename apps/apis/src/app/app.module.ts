import { Module } from '@nestjs/common';
import { ApiPassportModule } from "@whoa/api/passport/feature";
import { ApiSharedModule } from "@whoa/api/shared/feature";

@Module({
  imports: [ApiPassportModule, ApiSharedModule],
  controllers: [],
  providers: []
})
export class AppModule {}
