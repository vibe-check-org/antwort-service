import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

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

    @Column({ type: 'text' })
    @Field()
    antwort: string;

    @CreateDateColumn()
    @Field()
    erstelltAm: Date;
}
