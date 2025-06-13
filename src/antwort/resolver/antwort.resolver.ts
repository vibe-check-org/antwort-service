import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { AntwortService } from '../service/antwort.service.js';
import { Antwort } from '../model/entity/antwort.entity.js';
import { CreateAntwortInput } from '../model/dto/create-antwort.input.js';
import { Roles } from 'nest-keycloak-connect';

@Resolver(() => Antwort)
export class AntwortResolver {
    readonly #service: AntwortService;
    constructor(service: AntwortService) {
        this.#service = service;
    }

    @Mutation(() => Antwort)
    @Roles({ roles: ['Admin', 'User'] })
    saveAntwort(@Args('input') input: CreateAntwortInput) {
        return this.#service.create(input);
    }

    @Query(() => [Antwort])
    @Roles({ roles: ['Admin', 'User'] })
    antwortenVonUser(@Args('userId') userId: string) {
        return this.#service.findAllByUser(userId);
    }

    @Query(() => [Antwort])
    @Roles({ roles: ['Admin', 'User'] })
    getAnswersByFragebogenAndUser(
        @Args('fragebogenId') fragebogenId: string,
        @Args('userId') userId: string,
    ) {
        return this.#service.getAnswersByFragebogenAndUser(
            fragebogenId,
            userId,
        );
    }
}
