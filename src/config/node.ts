import { env } from './env.js';
import { httpsOptions } from './https.js';
import { RESOURCES_DIR, config } from './user.js';
import { hostname } from 'node:os';

const { NODE_ENV } = env;

const computername = hostname();
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const port = (config.node?.port as number | undefined) ?? 3000;

export const nodeConfig = {
    host: computername,
    port,
    resourcesDir: RESOURCES_DIR,
    databaseName: 'kk',
    httpsOptions,
    nodeEnv: NODE_ENV as
        | 'development'
        | 'PRODUCTION'
        | 'production'
        | 'test'
        | undefined,
} as const;
