import { Job } from "bull";
import { ReportingProcessorInterface } from "./reporting.processor.interface";
import { getConnection } from "src/tenancy/tenancy.utils";
import { ReportRequestMoneyInPipeDto } from "../dto/report.request.money.in.pipe.dto";
import { CurrencyService } from "src/modules/currency/currency.service";
import { Injectable } from "@nestjs/common";
import * as moment from 'moment';
import { ReportMoneyInPipeRawDto } from "../dto/report.money.in.pipe.raw.dto";
import { promises as fs } from 'fs';
import { join } from "path";

interface ITenant {
    clientReference: number;
    name: number;
    financeEmail: string;
}

@Injectable()
export class ReportingMoneyInHandProcessor  implements ReportingProcessorInterface {


    async process(job: Job, currency: CurrencyService): Promise<string> {

        const data  = job.data.params as ReportRequestMoneyInPipeDto;
        const connection  = await getConnection(data?.tenantId);
        const queryRunner = connection.createQueryRunner();
        if (queryRunner) {
            await queryRunner.connect();
            const result = await queryRunner.query(
            `select * from tenant_${data?.tenantId}.recruitment rec inner join tenant_${data?.tenantId}.vacancy_parameters vp on vp.vacancy_reference = rec.vacancy_reference where rec.status = 'RECRUTED' and last_update between $1 AND $2`,
                [data.startDate, data.endDate]
            );

            const records = result.map(async (raw: any) => {

                const date = moment(new Date(raw.last_update)).format("yyyy-MM-DD")

                const offeredSalaryTranslated = await this.translateValue(currency, raw.offered_currency, "usd", raw.offered_salary, date);
                
                const commision  = (10/100) * offeredSalaryTranslated;
                return ({
                    jobTitle: raw?.name,
                    offeredSalary: Number(offeredSalaryTranslated ?? 0)?.toFixed(2),
                    offeredCurrency: raw?.offered_currency,
                    vacancyReference: raw?.vacancy_reference,
                    offerStatus: raw?.status,
                    offerLastUpdated: raw?.last_update,
                    offerCreateDate: raw?.create_date,
                    contractType: raw?.contract_type,
                    jobType: raw?.job_type,
                    locationId: raw?.location_id,
                    maxSalary: raw?.max_salary,
                    minSalary: raw?.min_salary,
                    currencyType: raw?.currency,
                    vacancyCreateDate: raw?.lastupdate,
                    vacancyUpdatedDate: raw.createdate,
                    hourlyRate: raw?.hourly_rate,
                    weeklyRate: raw?.weekly_rate,
                    monthlyRate: raw?.monthly_rate,
                    jobDescription: raw?.job_description,
                    commision: Number(commision ?? 0)?.toFixed(2)

                    });
            });

            const reportRecords = await Promise.all(records);

            const toralCommition = await this.calculateTotalCommission(reportRecords);

            const tenant:ITenant = await this.getTenant(data?.tenantId);

            const fullReport = ({
                records: reportRecords,
                totalCommision: Number(toralCommition)?.toFixed(2),
                client: tenant?.name,
                clientEmail: tenant?.financeEmail,
                clientReferance: tenant?.clientReference
            });

            await fs.writeFile(join(__dirname, '../../../../', 'reports', `${job.data.storeLocation}.json`), JSON.stringify(fullReport), 'utf-8')

            console.log(job.data.storeLocation);
        }
       
        return null;
    }

    private async calculateTotalCommission(reportRecords: ReportMoneyInPipeRawDto[]): Promise<number> {
        let totalCommision:number  = 0;
        reportRecords.forEach((raw) => totalCommision +=raw.commision );
        return totalCommision;
    }

    private async translateValue(currency: CurrencyService, fromCurrency: string, toCurreny: string, value: number, date: string): Promise<number> {
        return currency.translateValue(fromCurrency, toCurreny, value, date);
    }

    private async getTenant(tenantId: string): Promise<ITenant> {

        const connection  = await getConnection(tenantId);
        const queryRunner = connection.createQueryRunner();

        let tenant = {};

        if (queryRunner) {

            await queryRunner.connect();
            const result = await Promise.all(await queryRunner.query(`select * from tenant_${tenantId}.client`));

            if (result && result.length === 1) {
                tenant =  ({
                    clientReference: result[0]["client_reference"],
                    name: result[0]["name"],
                    financeEmail: result[0]["finance_email"]
                })
            }
        }

        return tenant as ITenant;
    }

}