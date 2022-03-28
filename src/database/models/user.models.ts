import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Users {
    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;
};

export type UserDocument = Users & Document;

export const UserSchema = SchemaFactory.createForClass(Users);

UserSchema.plugin((ret, doc) => {
    // delete doc.password;
    // delete doc.__v;
})