import { HttpException, HttpStatus } from "@nestjs/common";

export class RecruitmentNotUpdatedException extends HttpException {
    constructor(id: number) {
        super(`Recruitement ${id} not updated`, HttpStatus.NOT_MODIFIED);
    }
}