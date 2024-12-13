import { Body, Controller, Get, Inject, Param, Post, Put, Query, Res, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { ReportRequestDto } from '../dto/report.request.dto';
import { ReportResponseDto } from '../dto/report.response.dto';
import { ReportingService } from '../services/reporting.service';
import { REPORTING_SERVICE } from '../constants/services';
import { ReportBaseType } from '../dto/report.base.type';
import { ReportViewTypeDto } from '../dto/report.view.type.dto';
import { ReportViewQueryDto } from '../dto/report.view.query.dto';
import { Response } from 'express';


@Controller('reporting')
@UsePipes(new ValidationPipe())
export class ReportingController {

    @Inject(REPORTING_SERVICE)
    private readonly reportingService: ReportingService;

    @Post()
    @UseFilters(new HttpExceptionFilter())
    async update(@Body() request: ReportRequestDto<ReportBaseType>): Promise<ReportResponseDto>  {
        return this.reportingService.queue(request);
    }


    @Get(":type")
    @UseFilters(new HttpExceptionFilter())
    async get(@Res() res: Response, @Param() type: ReportViewTypeDto, @Query() report:ReportViewQueryDto) {
        this.reportingService.get(res, type.type, report.name, report.type);
    }

}
