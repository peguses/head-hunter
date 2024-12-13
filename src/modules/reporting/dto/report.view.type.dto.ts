import { IsEnum, IsNotEmpty } from "class-validator";
import { ReportViewType } from "../enums/report.viwe.type";

export class ReportViewTypeDto {

    @IsEnum(ReportViewType, {message: `View type only support ${ Object.values(ReportViewType).join(", ")}`})
    @IsNotEmpty({message: "View type is required"})
    type: ReportViewType;
}