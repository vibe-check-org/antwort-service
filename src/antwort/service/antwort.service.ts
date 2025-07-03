import { CreateAntwortInput } from '../model/dto/create-antwort.input.js';
import { AntwortTemplate } from '../model/entity/antwort-template.entity.js';
import { Antwort } from '../model/entity/antwort.entity.js';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class AntwortService {
    readonly #antwortRepo: Repository<Antwort>;
    readonly #antwortTemplateRepo: Repository<AntwortTemplate>;

    constructor(
        @InjectRepository(Antwort)
        antwortRepo: Repository<Antwort>,
        @InjectRepository(AntwortTemplate)
        antwortTemplateRepo: Repository<AntwortTemplate>,
    ) {
        this.#antwortRepo = antwortRepo;
        this.#antwortTemplateRepo = antwortTemplateRepo;
    }

    async create(input: CreateAntwortInput): Promise<Antwort> {
        console.log('input: ', input);
        const antwort = this.#antwortRepo.create({
            userId: input.userId,
            frageId: input.frageId,
            fragebogenId: input.fragebogenId,
            antwort: input.antwort,
        });
        return this.#antwortRepo.save(antwort);
    }

    async findAllByUser(userId: string): Promise<Antwort[]> {
        return this.#antwortRepo.find({ where: { userId } });
    }

    async getAnswersByFragebogenAndUser(
        fragebogenId: string,
        userId: string,
    ): Promise<Antwort[]> {
        const antworten = await this.#antwortRepo.find({
            where: {
                fragebogenId,
                userId,
            },
        });

        return antworten.map((a) => ({
            ...a,
            antwort: Array.isArray(a.antwort) ? a.antwort : [a.antwort],
        }));
    }

    async getAnswersByFrage(frageId: string): Promise<AntwortTemplate[]> {
        const antworten = await this.#antwortTemplateRepo.find({
            where: {
                frageId,
            },
        });

        return antworten.map((a) => ({
            ...a,
            antwort: Array.isArray(a.antwort) ? a.antwort : [a.antwort],
        }));
    }

    async getAnswerTemplatesByAntwortIds(
        ids: string[],
    ): Promise<AntwortTemplate[]> {
        return this.#antwortTemplateRepo.findBy({ id: In(ids) }); // bei TypeORM
    }

    async getAnswerTemplateByAntwortId(id: string): Promise<AntwortTemplate> {
        return this.#antwortTemplateRepo.findOne({ where: { id } }); // bei TypeORM
    }
}
