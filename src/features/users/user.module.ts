import { Module } from "@nestjs/common";
import { SharedModule } from "src/common/shared.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./users.repository";

@Module({
    imports: [SharedModule],
    providers: [UserService, UserRepository],
    controllers: [UserController],
})
export class UserModule {}