import { Module } from "@nestjs/common";
import { SharedModule } from "src/common/shared.module";
import { UserRepository } from "../users/users.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [SharedModule],
    providers: [AuthService, UserRepository],
    controllers: [AuthController],
})
export class AuthModule {}