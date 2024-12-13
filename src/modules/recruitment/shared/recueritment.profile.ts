import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { RecrutmentDto } from "../dto/recruitment.dto";
import { RecrutmentEntity } from "../entities/recruitment.entity";

@Injectable()
export class RecruitmentProfile extends AutomapperProfile {

    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, RecrutmentDto, RecrutmentEntity);
            createMap(mapper, RecrutmentEntity, RecrutmentDto);
        };
    }

}