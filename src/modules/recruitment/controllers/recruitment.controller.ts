import { Body, Controller, Get, Inject, Param, Put, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { RecruitmentService } from '../services/recruitment.service';
import { RECRUITMENT_SERVICE } from '../constants/services';
import { RecrutmentDto } from '../dto/recruitment.dto';
import { HttpExceptionFilter } from '../../../filters/http-exception.filter';
import { Validate } from 'class-validator';

@Controller('recruitment')
@UsePipes(new ValidationPipe())
export class RecruitmentController {

    @Inject(RECRUITMENT_SERVICE)
    private readonly recruitmentService: RecruitmentService

    @Get()
    @UseFilters(new HttpExceptionFilter())
    async findAll(): Promise<Array<RecrutmentDto>> {
        return await this.recruitmentService.findAll();
    }

    @Get(":id")
    @UseFilters(new HttpExceptionFilter())
    async find(@Param("id") id: number): Promise<RecrutmentDto> {
        return await this.recruitmentService.find(id);
    }

    @Put(":id")
    @UseFilters(new HttpExceptionFilter())
    async update(@Param("id") id: number, @Body() recruitment: RecrutmentDto): Promise<RecrutmentDto>  {
        return await this.recruitmentService.update(id, recruitment);
    }
    
}
