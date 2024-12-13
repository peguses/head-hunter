import { Global, Module } from '@nestjs/common';
import { requestScopeConnectionProvider } from './tenancy.provider';
import { TENENT_CONNECTION } from 'src/common/constants/datasource';

@Global()
@Module({
    providers: [requestScopeConnectionProvider],
    exports: [TENENT_CONNECTION]
})
export class TenancyModule {}
