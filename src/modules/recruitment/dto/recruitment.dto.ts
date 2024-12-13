import { AutoMap } from "@automapper/classes";
import { RecrutmentStatus } from "../enums/recrutment.status";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class RecrutmentDto {

    @AutoMap()
    @IsNumber()
    offered_salary: number;

    @AutoMap()
    @IsString()
    currency: string;

    @AutoMap()
    vacancy_reference: string;

    @AutoMap()
    @IsEnum(RecrutmentStatus, {message: `only support ${ Object.values(RecrutmentStatus).join(", ")}`})
    status: RecrutmentStatus;

    @AutoMap()
    lastUpdate: Date;

    @AutoMap()
    createDate: Date;

}