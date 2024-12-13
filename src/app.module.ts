import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TenancyModule } from './tenancy/tenancy.module';
import { TenancyMiddleware } from './tenancy/tenancy.middleware';
import { ReportingModule } from './modules/reporting/reporting.module';
import { CurrencyModule } from './modules/currency/currency.module';


@Module({
  imports: [
    RecruitmentModule,
    AutomapperModule.forRoot({
            strategyInitializer: classes(),
    }),
    TenancyModule,
    ReportingModule,
    CurrencyModule
  ],
  providers: [TenancyMiddleware]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenancyMiddleware).forRoutes('/');
  }
}
