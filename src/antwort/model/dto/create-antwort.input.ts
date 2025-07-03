import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAntwortInput {
    @Field()
    userId: string;

    @Field()
    fragebogenId: string;

    @Field()
    frageId: string;

    @Field(() => [String])
    antwort: string[];
}
