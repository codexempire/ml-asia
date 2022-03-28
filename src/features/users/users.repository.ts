import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery } from "mongoose";
import { UserDocument, Users } from "src/database/models/user.models";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(Users.name) private usersModel: Model<UserDocument>
    ) {}

    async create(user: Users): Promise<Users> {
        const newUser = new this.usersModel(user);

        return newUser.save();
    }

    async findOne(userFilter: FilterQuery<Users>): Promise<Users> {
        return this.usersModel.findOne(userFilter);
    }

    async findByEmail(email: string): Promise<Users> {
        return this.usersModel.findOne({ email });
    }

    async findById(userId: string): Promise<Users> {
        return this.usersModel.findById(userId);
    }

    async findAll(userFilter: FilterQuery<Users>): Promise<Users[]> {
        return this.usersModel.find(userFilter);
    }

    async paginate(userFilter: FilterQuery<Users>, page: number, limit: number, select: string): Promise<Users[]> {
        return this.usersModel
            .find(userFilter)
            .skip((page - 1) * limit)
            .limit(limit)
            .select(select);
    }

    async countDocument(): Promise<number> {
        return this.usersModel.countDocuments()
    }
}