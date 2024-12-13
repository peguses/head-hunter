import { IsDate, IsNotEmpty, IsString, Validate } from "class-validator";
import { ReportBaseType } from "./report.base.type";
import { IsValidDate } from "../validations/isValidDate";

export class ReportRequestMoneyInPipeDto extends ReportBaseType {
    
    @IsString()
    @IsNotEmpty()
    @Validate(IsValidDate)
    startDate: string;

    @IsString()
    @IsNotEmpty()
    @Validate(IsValidDate)
    endDate: string;

}