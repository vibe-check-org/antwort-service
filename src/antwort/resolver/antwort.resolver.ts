import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';
import { AntwortService } from '../service/antwort.service.js';
import { Antwort } from '../model/entity/antwort.entity.js';
import { CreateAntwortInput } from '../model/dto/create-antwort.input.js';

@Resolver(() => Antwort)
export class AntwortResolver {
    readonly #service: AntwortService;
    constructor(service: AntwortService) {
        this.#service = service;
    }

    @Mutation(() => Antwort)
    createAntwort(@Args('input') input: CreateAntwortInput) {
        return this.#service.create(input);
    }

    @Query(() => [Antwort])
    antwortenVonUser(@Args('userId') userId: string) {
        return this.#service.findAllByUser(userId);
    }
}
