import { ReportMoneyInPipeRawDto } from "./report.money.in.pipe.raw.dto";

export class ReportMoneyInPipeDto {

    records: Array<ReportMoneyInPipeRawDto>;

    client: string;

    clientEmail: string;

    totalCommision: number;

    clientReferance: string;
}