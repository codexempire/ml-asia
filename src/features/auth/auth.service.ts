import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Users } from "src/database/models/user.models";
import { UserRepository } from "../users/users.repository";
import { LoginPayload, RegistrationPayload } from "./auth.types";

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepository: UserRepository,
        private jwtTokenService: JwtService,
    ) {}

    async register({ email, password, firstName, lastName}: RegistrationPayload) {

        const existingEmail: Users = await this.userRepository.findByEmail(email);

        if(existingEmail) {
            throw new ConflictException({ error: "Email has been taken" });
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);

        const user: Users = await this.userRepository.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        return { token: this.jwtTokenService.sign({ email: user.email }) };
    }

    async login({email, password}: LoginPayload) {
        const user: Users = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new NotFoundException({ error: "Invalid Credentials" });
        }

        const matchingPassword: boolean = await bcrypt.compare(password, user.password);

        if (!matchingPassword) {
            throw new ConflictException({ error: "invalid Credentials" });
        }

        return { token: this.jwtTokenService.sign({ email: user.email }) };
    }
}