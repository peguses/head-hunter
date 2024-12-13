import { Global, Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyCacheService } from './currency.cache.service';
import { CURRENCY_CACHE_SERVICE, CURRENCY_EXCHANGE_RATE_SERVICE, CURRENCY_SERVICE } from './constants';
import { CurrencyExchangeRateService } from './currency.exchange.rate.service';
import { HttpModule } from '@nestjs/axios';

// @Global()
@Module({
    imports: [HttpModule],
    providers: [{
        useClass: CurrencyService,
        provide: CURRENCY_SERVICE
    },{
        useClass: CurrencyCacheService,
        provide: CURRENCY_CACHE_SERVICE
    },
    {
        useClass: CurrencyExchangeRateService,
        provide: CURRENCY_EXCHANGE_RATE_SERVICE
    }],
    exports: [{
        useClass: CurrencyService,
        provide: CURRENCY_SERVICE
    },{
        useClass: CurrencyCacheService,
        provide: CURRENCY_CACHE_SERVICE
    },
    {
        useClass: CurrencyExchangeRateService,
        provide: CURRENCY_EXCHANGE_RATE_SERVICE
    }
    ]
})
export class CurrencyModule {}
