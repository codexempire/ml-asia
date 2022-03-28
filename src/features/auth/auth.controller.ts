import { Body, Controller, Post } from "@nestjs/common";
import { LoginDTO, RegisterDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("v1/auth")
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @Post("login")
    login(@Body() body: LoginDTO) {
        return this.authService.login(body);
    }

    @Post("register")
    register(@Body() body: RegisterDTO) {
        return this.authService.register(body);
    }
}