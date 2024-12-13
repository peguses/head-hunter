import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { map } from "rxjs";
import { firstValueFrom } from 'rxjs';
import * as https from 'https';

export type CurrencyRecord = Record<string, number>;

@Injectable()
export class CurrencyExchangeRateService {

    constructor(private readonly httpService: HttpService) {} 

    private httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    async findExchangeRates(currency: string, date: string) : Promise<CurrencyRecord> {

        const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currency}.json`;

        try {
            return await firstValueFrom(this.httpService.get(url, { httpsAgent: this.httpsAgent })
            .pipe(map((resposen) => this.getCurrencyRecord(resposen.data[currency]))));
          } catch (error) {
            console.error('Error fetching data from API:', error);
            throw new Error('Could not fetch data from the external service');
          }
    }

    async getCurrencyRecord(data: any): Promise<CurrencyRecord> {
      return Object.entries(data).reduce((acc: any, [key, value])=> {
        acc[key] = value
        return acc;
      }, {} as CurrencyRecord)
    }
    
}