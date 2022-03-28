import { Injectable } from "@nestjs/common";
import { Users } from "src/database/models/user.models";
import { UserRepository } from "./users.repository";

@Injectable()
export class UserService {

    constructor (
        private readonly userRepository: UserRepository,
    ) {}

    async getUsers(page: number, limit: number = 10) {

        const counts = await this.userRepository.countDocument()

        return {
            data: {
                users: await this.userRepository.paginate({}, page, limit, '_id firstName lastName email'),
                limit,
                page,
                pages: Math.ceil(counts / limit),
                counts,
            }
        }
    }
}