import { DataSource } from "typeorm"
import { RecrutmentEntity } from "../entities/recruitment.entity"
import { REPORTING_REPOSITORY } from "../constants/repositories"
import { TENENT_CONNECTION } from "src/common/constants/datasource"

export const recruitmentRepository = [
    {
        provide: REPORTING_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RecrutmentEntity),
        inject: [TENENT_CONNECTION],
    },

]