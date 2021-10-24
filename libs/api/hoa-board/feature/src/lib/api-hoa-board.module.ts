import { Module } from '@nestjs/common';
import { ApiCoreModule } from '@whoa/api/core/feature';
import { HoaBoardService } from './services/hoa-board.service';
import { HoaBoardController } from './controllers/hoa-board.controller';

@Module({
  imports: [ApiCoreModule],
  controllers: [HoaBoardController],
  providers: [HoaBoardService],
  exports: []
})
export class ApiHoaBoardModule {}
