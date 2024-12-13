import { HttpException, Inject, Injectable } from "@nestjs/common";
import { CurrencyCacheService } from "./currency.cache.service";
import { CurrencyExchangeRateService, CurrencyRecord } from "./currency.exchange.rate.service";
import { CURRENCY_CACHE_SERVICE, CURRENCY_EXCHANGE_RATE_SERVICE } from "./constants";

@Injectable()
export class CurrencyService {


    @Inject(CURRENCY_CACHE_SERVICE)
    private readonly currencyCache: CurrencyCacheService;

    @Inject(CURRENCY_EXCHANGE_RATE_SERVICE)
    private readonly currencyExchangeRateService: CurrencyExchangeRateService;

    async translateValue(fromCurrency: string, toCurrency: string, value: number, date: string) : Promise<number> {

        const fromCurrencyExRates: CurrencyRecord = await this.currencyExchangeRateService.findExchangeRates(toCurrency, date);
        
        const fromRate =  fromCurrencyExRates[fromCurrency];
        const toRate = fromCurrencyExRates[toCurrency];
    
        if (fromRate === undefined || toRate === undefined) {
            return null;
        }
    
        const amountInUSD = value / fromRate;
        const convertedAmount = amountInUSD * toRate;
    
        return convertedAmount;
    }

}