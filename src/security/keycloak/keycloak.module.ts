// eslint-disable-next-line max-classes-per-file
import { KeycloakGuard } from './guards/keycloak.guard.js';
import { KeycloakService } from './keycloak.service.js';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

@Module({
    providers: [KeycloakService],
    exports: [KeycloakService],
})
class ConfigModule {}

@Module({
    imports: [
        KeycloakConnectModule.registerAsync({
            useExisting: KeycloakService,
            imports: [ConfigModule],
        }),
    ],
    providers: [
        KeycloakService,
        {
            provide: APP_GUARD,
            useClass: KeycloakGuard,
        },
    ],
    exports: [KeycloakConnectModule, KeycloakService],
})
export class KeycloakModule {}
