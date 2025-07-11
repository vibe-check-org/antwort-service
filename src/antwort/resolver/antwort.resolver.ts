import { ResponseTimeInterceptor } from '../../logger/response-time.interceptor.js';
import { KeycloakGuard } from '../../security/keycloak/guards/keycloak.guard.js';
import { CreateAntwortInput } from '../model/dto/create-antwort.input.js';
import { AntwortTemplate } from '../model/entity/antwort-template.entity.js';
import { Antwort } from '../model/entity/antwort.entity.js';
import { AntwortService } from '../service/antwort.service.js';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { Roles } from 'nest-keycloak-connect';

@Resolver(() => Antwort)
@UseGuards(KeycloakGuard)
@UseInterceptors(ResponseTimeInterceptor)
export class AntwortResolver {
    readonly #service: AntwortService;
    constructor(service: AntwortService) {
        this.#service = service;
    }

    @Mutation(() => Antwort)
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    saveAntwort(@Args('input') input: CreateAntwortInput) {
        return this.#service.create(input);
    }

    @Query(() => [Antwort])
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    antwortenVonUser(@Args('userId') userId: string) {
        return this.#service.findAllByUser(userId);
    }

    @Query(() => [Antwort])
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    async getAnswersByFragebogenAndUser(
        @Args('fragebogenId') fragebogenId: string,
        @Args('userId') userId: string,
    ) {
        const result = await this.#service.getAnswersByFragebogenAndUser(
            fragebogenId,
            userId,
        );

        console.log('result: ', result);
        return result;
    }

    @Query(() => [AntwortTemplate])
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    getAnswersByQuestion(@Args('frageId') frageId: string) {
        return this.#service.getAnswersByFrage(frageId);
    }

    @Query(() => [AntwortTemplate])
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    getAnswerTemplatesAnwersByIds(
        @Args('antwortIds', { type: () => [String] }) antwortIds: string[],
    ) {
        return this.#service.getAnswerTemplatesByAntwortIds(antwortIds);
    }

    @Query(() => AntwortTemplate)
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    getAnswerTemplateAnwerById(
        @Args('antwortId', { type: () => String }) antwortId: string,
    ) {
        return this.#service.getAnswerTemplateByAntwortId(antwortId);
    }
}
