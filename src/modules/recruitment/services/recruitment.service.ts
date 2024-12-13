import { Inject, Injectable } from '@nestjs/common';
import { REPORTING_REPOSITORY } from '../constants/repositories';
import { RecrutmentEntity } from '../entities/recruitment.entity';
import { Repository, UpdateResult } from 'typeorm';
import { RecrutmentDto } from '../dto/recruitment.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { RecruitmentNotFound } from '../exceptions/recruitment.notfound.exception';
import { RecruitmentNotUpdatedException } from '../exceptions/recruitment.notupdated.exception';

@Injectable()
export class RecruitmentService {

    @Inject(REPORTING_REPOSITORY)
    private reportingRepository: Repository<RecrutmentEntity>

    @InjectMapper()
    private readonly classMapper: Mapper;

    async findAll() :Promise<Array<RecrutmentDto>> {
        return this.classMapper.mapArrayAsync(await this.reportingRepository.find(), RecrutmentEntity, RecrutmentDto);
    }

    async find(id: number): Promise<RecrutmentDto> {
        const recruitment = await this.reportingRepository.findOne({where: {id: id}});
        
        if (!recruitment) {
            throw new RecruitmentNotFound(id);
        }

        return this.classMapper.map(recruitment, RecrutmentEntity, RecrutmentDto);

    }

    async update(id: number, recruitment: RecrutmentDto) :Promise<RecrutmentDto> {

        const exist: boolean = await this.reportingRepository.exists({ where: {id : id}});

        if (!exist) {
            throw new RecruitmentNotFound(id);
        }
        const result: UpdateResult = await this.reportingRepository.update(
            id, {...this.classMapper.map(recruitment, RecrutmentDto, RecrutmentEntity), lastUpdate: new Date()}
        );

        if (result.affected !== 1) {
            throw new RecruitmentNotUpdatedException(id);
        }

        return recruitment;
    }

}