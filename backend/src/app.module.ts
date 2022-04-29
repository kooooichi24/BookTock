import { Module } from '@nestjs/common';
import { SampleController } from './interface/controllers/sample/SampleController';

@Module({
  imports: [],
  controllers: [SampleController],
  providers: [],
})
export class AppModule {}
