import { Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TENENT_CONNECTION } from 'src/common/constants/datasource';
import { getConnection } from './tenancy.utils';


export const requestScopeConnectionProvider = {
  provide: TENENT_CONNECTION,
  scope: Scope.REQUEST,
  useFactory: async (request: Request) => {
    const { headers } = request;

    const tenantId = headers['X-TENANT-ID'] || headers['x-tenant-id'];

    if (tenantId) {
      const connection = await getConnection(tenantId);

      const queryRunner = connection.createQueryRunner();
      await queryRunner.connect();

      return queryRunner.manager;
    }

    return null;
  },
  inject: [REQUEST],
};