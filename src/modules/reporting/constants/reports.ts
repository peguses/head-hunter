import { ReportRequestMoneyInPipeDto } from "../dto/report.request.money.in.pipe.dto";
import { ReportType } from "../enums/report.type";

export const MONEY_IN_PIPELINE_PROCESSOR = "reportingMoneyInHandProcessor";

export const REPORTING_JSON_VIEW_SERVICE = "reportingJsonViewService"

export const MONEY_IN_PIPELINE_PDF_VIEW = "reportingMoneyInHandPdfService"

export const reportMapping: Record<string, any> = {
    [ReportType.MONEY_IN_PIPELINE]: {
        type: ReportRequestMoneyInPipeDto,
        processor: MONEY_IN_PIPELINE_PROCESSOR,
        jsonView: REPORTING_JSON_VIEW_SERVICE,
        pdfView: MONEY_IN_PIPELINE_PDF_VIEW
    }
}