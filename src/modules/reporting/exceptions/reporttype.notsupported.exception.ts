import { HttpException, HttpStatus } from "@nestjs/common";

export class ReportTypeNotSupported extends HttpException {
    constructor(type: string) {
        super(`Report type ${type} not supported`, HttpStatus.BAD_REQUEST);
    }
}