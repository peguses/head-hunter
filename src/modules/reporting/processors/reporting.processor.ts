import { Process, Processor } from "@nestjs/bull";
import { REPORT_PROCESSOR } from "../constants/processors";
import { Job } from "bull";
import { reportMapping } from "../constants/reports";
import { ReportingProcessorInterface } from "./reporting.processor.interface";
import { Inject } from "@nestjs/common";
import { CurrencyService } from "src/modules/currency/currency.service";
import { CURRENCY_SERVICE } from "src/modules/currency/constants";
import { REPORT_TYPE_PROCESSOR_FACTORY, ReportTypeProcessorFactory } from "../factories/report.type.processor.factory";

@Processor(REPORT_PROCESSOR)
export class ReportingProcessor {

    @Inject(CURRENCY_SERVICE)
    private readonly currency: CurrencyService;

    @Inject(REPORT_TYPE_PROCESSOR_FACTORY)
    private readonly processorFactory: ReportTypeProcessorFactory;

    @Process()
    async handleApiRequest(job: Job) {

        ((this.processorFactory.createService(reportMapping[job.data.type].processor)) as ReportingProcessorInterface).process(job, this.currency);

    }

}