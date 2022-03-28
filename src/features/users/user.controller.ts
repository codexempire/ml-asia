import { Controller, Get, Query, UseFilters, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGaurd } from "src/gaurds/jwt.gaurds";
import { GetUsersQueryDTO } from "./user.dto";
import { UserService } from "./user.service";

@Controller("v1/users")
export class UserController {

    constructor (
        private userService: UserService,
    ) {}

    @UseGuards(JwtAuthGaurd)
    @Get()
    getUsers(@Query() query: GetUsersQueryDTO) {
        return this.userService.getUsers(query.page, query.limit);
    }
}