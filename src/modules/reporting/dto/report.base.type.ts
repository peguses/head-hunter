import { IsNotEmpty, IsString } from "class-validator";

export class ReportBaseType {

    @IsNotEmpty()
    @IsString()
    tenantId: string
}