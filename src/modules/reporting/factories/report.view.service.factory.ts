import { Injectable } from "@nestjs/common";
import { ReportingJsonViewService } from "../services/reporting.json.view.service";
import { ReportingMoneyInHandPdfService } from "../services/reporting.moneyinhand.pdf.service";

export const REPORT_VIEW_SERVICE_FACTORY = "reportViewServiceFactory";

@Injectable()
export class ReportViewServiceFacotry {

    private readonly services = {
        reportingJsonViewService:  ReportingJsonViewService,
        reportingMoneyInHandPdfService: ReportingMoneyInHandPdfService
    };

    createService(serviceName: string) {
        const service = this.services[serviceName];
        if (!service) {
            throw new Error(`Service ${serviceName} not found`);
        }
        return new service();
    }
}