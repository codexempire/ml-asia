import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport"
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Users, UserSchema } from "src/database/models/user.models";
import { configConstants } from "./config-constants";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Users.name, schema: UserSchema }
        ]),
        // PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>(configConstants.jwt.secret),
                signOptions: {
                    expiresIn: (60 * 60 * 24)
                }
            }),
        }),
    ],
    exports: [
        MongooseModule.forFeature([
            { name: Users.name, schema: UserSchema }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigService],
            useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>(configConstants.jwt.secret),
            signOptions: {
                expiresIn: (60 * 60 * 24)
            }
            }),
        }),
    ],
})
export class SharedModule {}