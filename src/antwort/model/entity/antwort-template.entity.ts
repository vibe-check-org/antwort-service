import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class AntwortTemplate {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    frageId: string;

    @Column('text', { array: true })
    @Field(() => [String])
    antwort: string[];

    @Column({ type: 'text' })
    @Field()
    punkte: number;

    @CreateDateColumn()
    @Field()
    erstelltAm: Date;
}
