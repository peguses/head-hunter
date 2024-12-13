import { HttpException, HttpStatus } from "@nestjs/common";

export class RecruitmentNotFound extends HttpException {
    constructor(id: string | number) {
        super(`recruitment ${id} not found`, HttpStatus.NOT_FOUND)
    }
}