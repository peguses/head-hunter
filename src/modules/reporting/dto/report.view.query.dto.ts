import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ReportType } from "../enums/report.type";

export class ReportViewQueryDto {

    @IsNotEmpty({message: "Report name is required"})
    @IsString({message: "Report name should be a string"})
    name: string;

    @IsEnum(ReportType, {message: `Report type only support ${ Object.values(ReportType).join(", ")}`})
    @IsNotEmpty({message: "Report type is required"})
    type: ReportType
}