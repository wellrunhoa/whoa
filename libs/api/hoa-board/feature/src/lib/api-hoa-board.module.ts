import { Module } from '@nestjs/common';
import { ApiCoreModule } from '@whoa/api/core/feature';
import { HoaBoardService } from './services/hoa-board.service';
import { HoaBoardController } from './hoa-board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoaBoard, HoaBoardMember } from './entities';

@Module({
  imports: [ApiCoreModule, TypeOrmModule.forFeature([HoaBoard, HoaBoardMember])],
  controllers: [HoaBoardController],
  providers: [HoaBoardService],
  exports: [TypeOrmModule]
})
export class ApiHoaBoardModule {}
