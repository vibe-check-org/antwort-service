import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Antwort {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    userId: string;

    @Column()
    @Field()
    frageId: string;

    @Column()
    @Field()
    fragebogenId: string;

    @Column('text', { array: true })
    @Field(() => [String])
    antwort: string[];

    @CreateDateColumn()
    @Field()
    erstelltAm: Date;
}
