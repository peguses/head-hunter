import { IsDefined, IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ReportBaseType } from "./report.base.type";
import { ReportType } from "../enums/report.type";
import { reportMapping } from "../constants/reports";

export class ReportRequestDto<T extends ReportBaseType> {

    @IsEnum(ReportType, {message: `only support ${ Object.values(ReportType).join(", ")}`})
    @IsNotEmpty({message: "Type is required"})
    type: ReportType;

    @IsDefined({message: "Request parameters(params) are required"})
    @ValidateNested()
    @Type((x: any) => reportMapping[x?.newObject?.type].type)
    params: T;

    storeLocation: string;
    
}