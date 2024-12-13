import { Module } from '@nestjs/common';
import { ReportingService } from './services/reporting.service';
import { REPORTING_SERVICE } from './constants/services';
import { BullModule } from '@nestjs/bull';
import { ReportingProcessor } from './processors/reporting.processor';
import { REPORT_PROCESSOR } from './constants/processors';
import { ReportingController } from './controllers/reporting.controller';
import { CurrencyModule } from 'src/modules/currency/currency.module';
import { REPORT_TYPE_PROCESSOR_FACTORY, ReportTypeProcessorFactory } from './factories/report.type.processor.factory';
import { REPORT_VIEW_SERVICE_FACTORY, ReportViewServiceFacotry } from './factories/report.view.service.factory';

@Module({
  providers: [
    {
        useClass: ReportingService,
        provide: REPORTING_SERVICE
    },
    ReportingProcessor,
    { 
      useClass: ReportTypeProcessorFactory,
      provide: REPORT_TYPE_PROCESSOR_FACTORY
    },
    { 
      useClass: ReportViewServiceFacotry,
      provide: REPORT_VIEW_SERVICE_FACTORY
    }
  ],
  imports: [
    CurrencyModule,
    BullModule.registerQueue({
      name: REPORT_PROCESSOR,
    })
  ],
  controllers: [ReportingController]
})
export class ReportingModule {}
