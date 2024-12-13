import { Injectable } from "@nestjs/common";
import { ReportingMoneyInHandProcessor } from "../processors/reporting.moneyinhand.processor";

export const REPORT_TYPE_PROCESSOR_FACTORY = "reportTypeProcessorFactory";

@Injectable()
export class ReportTypeProcessorFactory {

    private readonly services = {
        reportingMoneyInHandProcessor:  ReportingMoneyInHandProcessor,
    };

    createService(serviceName: string) {
        const service = this.services[serviceName];
        if (!service) {
            throw new Error(`Service ${serviceName} not found`);
        }
        return new service();
    }
}