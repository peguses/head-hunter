import { dataSourceConfig } from "src/config/datasource.orm.config";
import { DataSource, DataSourceOptions } from "typeorm";


export const tenantConnection: {[schema: string]: DataSource} = {};

export async function getConnection(tenantId: string): Promise<DataSource> {

    const connectionName = `tenant_${tenantId}`;

    if (tenantConnection[connectionName]) {
        const connection = tenantConnection[connectionName];
        return connection;
    } else {
        const dataSource = new DataSource({
        ...dataSourceConfig,
        name: connectionName,
        schema: connectionName,
        poolSize: 3000,
        } as DataSourceOptions);

        await dataSource.initialize();

        tenantConnection[connectionName] = dataSource;

        return dataSource;
    }
    
}