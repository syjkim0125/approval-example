import { Module } from '@nestjs/common';

import { DocumentApprovalModule } from 'src/document-approval/DocumentApprovalModule';
import { AppService } from 'src/AppService';

@Module({
  imports: [DocumentApprovalModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
