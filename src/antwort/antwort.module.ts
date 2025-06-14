import { KafkaModule } from '../messaging/kafka.module.js';
import { KeycloakModule } from '../security/keycloak/keycloak.module.js';
import { entities } from './model/entity/entities.js';
import { AntwortResolver } from './resolver/antwort.resolver.js';
import { AntwortService } from './service/antwort.service.js';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        forwardRef(() => KafkaModule),
        TypeOrmModule.forFeature(entities),
        KeycloakModule,
    ],
    // Provider sind z.B. Service-Klassen fuer DI
    providers: [AntwortResolver, AntwortService],
    // Export der Provider fuer DI in anderen Modulen
    exports: [AntwortService],
})
export class AntwortModule {}
