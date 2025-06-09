import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAntwortInput } from '../model/dto/create-antwort.input.js';
import { Antwort } from '../model/entity/antwort.entity.js';

@Injectable()
export class AntwortService {
    readonly #antwortRepo: Repository<Antwort>;

    constructor(
        @InjectRepository(Antwort)
        antwortRepo: Repository<Antwort>,
    ) {
        this.#antwortRepo = antwortRepo;
    }

    async create(input: CreateAntwortInput): Promise<Antwort> {
        const antwort = this.#antwortRepo.create(input);
        return this.#antwortRepo.save(antwort);
    }

    async findAllByUser(userId: string): Promise<Antwort[]> {
        return this.#antwortRepo.find({ where: { userId } });
    }
}
