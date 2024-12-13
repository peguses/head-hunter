import { Injectable } from "@nestjs/common";
import { join } from "path";
import { promises as fs } from 'fs';

@Injectable()
export class CurrencyCacheService {

    async readCurrency(date: string, currency: string): Promise<Map<string, number>> {
        try {
            const data = await fs.readFile(join(__dirname, '..', 'cache', `${currency}_${date}.json`), 'utf-8');
            return new Map<string, number>(Object.entries(JSON.parse(data)));
        } catch (error) {
           // we can attempt retey here
           console.log(error)
        }
    }

}