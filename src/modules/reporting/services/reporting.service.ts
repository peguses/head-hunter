import { Inject, Injectable } from "@nestjs/common";
import { REPORT_PROCESSOR } from "../constants/processors";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { ReportRequestDto } from "../dto/report.request.dto";
import { ReportBaseType } from "../dto/report.base.type";
import { ReportResponseDto } from "../dto/report.response.dto";
import { ReportRequestMoneyInPipeDto } from "../dto/report.request.money.in.pipe.dto";
import { ReportTypeNotSupported } from "../exceptions/reporttype.notsupported.exception";
import { ReportViewType } from "../enums/report.viwe.type";
import { ReportType } from "../enums/report.type";
import { REPORT_VIEW_SERVICE_FACTORY, ReportViewServiceFacotry } from "../factories/report.view.service.factory";
import { reportMapping } from "../constants/reports";
import { ReportingViewInterface } from "./reporting.view.interface";
import { Response } from 'express';

@Injectable()
export class ReportingService {

    constructor
    (@InjectQueue(REPORT_PROCESSOR) private apiQueue: Queue,
     @Inject(REPORT_VIEW_SERVICE_FACTORY) private reportViewServiceFacotry:  ReportViewServiceFacotry
    ) {}

    private generateLocationUrl(request: ReportRequestDto<ReportBaseType>): string {

        const handler = this.storeLocationHandlers[request['type']];

        if (handler) {
            return handler(request);
        }

        throw new ReportTypeNotSupported(request.constructor.name);
    }

    private storeLocationHandlers: { [key: string]: (obj: any) => string } = {
        'MONEY_IN_PIPELINE': (obj: ReportRequestMoneyInPipeDto) => {
            return  `money-in-pipe-${obj['params'].startDate}-${obj['params'].endDate}.json`
        },
    };

    async queue(request: ReportRequestDto<ReportBaseType>): Promise<ReportResponseDto> {
        const location: string = this.generateLocationUrl(request)
        this.apiQueue.add({...request, storeLocation: this.generateLocationUrl(request)});
        return new ReportResponseDto(location);
    }

    async get(response: Response, type: ReportViewType, name: string, reportType: ReportType): Promise<void> {
        if (type ===  ReportViewType.JSON) {
             ((this.reportViewServiceFacotry.createService(reportMapping[reportType].jsonView) as ReportingViewInterface)).process(response, name);
        }

        if (type === ReportViewType.PFD) {
             ((this.reportViewServiceFacotry.createService(reportMapping[reportType].pdfView) as ReportingViewInterface)).process(response, name);
        }
    }
    
}