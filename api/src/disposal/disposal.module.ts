import { Module } from '@nestjs/common';
import { DisposalService } from './disposal.service';
import { DisposalController } from './disposal.controller';

@Module({
  controllers: [DisposalController],
  providers: [DisposalService],
})
export class DisposalModule {}
