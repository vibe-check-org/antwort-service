/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Antwort } from '../antwort/model/entity/antwort.entity.js';
import { entities } from '../antwort/model/entity/entities.js';
import { loggerDefaultValue } from './logger.js';
import { nodeConfig } from './node.js';
import { SnakeNamingStrategy } from './typeormNamingStrategy.js';
import { config } from './user.js';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'node:path';
import { DataSourceOptions } from 'typeorm';

const { db } = config;

// nullish coalescing
const database =
    (db?.database as string | undefined) ?? Antwort.name.toLowerCase();

const host = db?.host as string | undefined;
const username =
    (db?.username as string | undefined) ?? Antwort.name.toLowerCase();
const pass = db?.password as string | undefined;
const passAdmin = db?.passwordAdmin as string | undefined;
const schema = db?.schema as string | undefined;

const namingStrategy = new SnakeNamingStrategy();

const logging =
    (nodeConfig.nodeEnv === 'development' || nodeConfig.nodeEnv === 'test') &&
    !loggerDefaultValue;
const logger = 'advanced-console';

export const dbResourcesDir = resolve(
    nodeConfig.resourcesDir,
    'db',
    'postgres',
);
console.debug('dbResourcesDir = %s', dbResourcesDir);
console.debug(
    'database=%s, username=%s, password=%s, host=%s, schema=%s',
    database,
    username,
    pass,
    host,
    schema,
);

// TODO records als "deeply immutable data structure" (Stage 2)
const dataSourceOptions: TypeOrmModuleOptions = {
    type: 'postgres',
    host,
    port: 5432,
    username,
    password: pass,
    database,
    schema,
    poolSize: 10,
    entities,
    logging,
    logger,
    namingStrategy,
};
Object.freeze(dataSourceOptions);
export const typeOrmModuleOptions = dataSourceOptions;

export const dbPopulate = db?.populate === true;
const adminDataSourceOptionsTemp: DataSourceOptions = {
    type: 'postgres',
    host,
    port: 5432,
    username: 'postgres',
    password: passAdmin,
    database,
    schema,
    namingStrategy,
    logging,
    logger,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
};

export const adminDataSourceOptions = adminDataSourceOptionsTemp;
