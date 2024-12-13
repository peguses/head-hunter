import { Job } from "bull";
import { CurrencyService } from "src/modules/currency/currency.service";

export interface ReportingProcessorInterface {
    process(job: Job, currencyCache: CurrencyService): Promise<string>
}