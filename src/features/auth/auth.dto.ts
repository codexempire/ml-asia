import { Transform } from "class-transformer";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDTO {

    @IsEmail({ message: "Email must be valid" })
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @IsString({ message: "Password must be a string" })
    @MinLength(6, { message: "Password must be a minimum of 6 characters" })
    @MaxLength(18, { message: "Password must be a maximum of 18 characters" })
    password: string;
}

export class RegisterDTO extends LoginDTO {

    @IsString({ message: "First name must be a string" })
    @MinLength(3, { message: "First name must be a minimum of 3 characters" })
    firstName: string;

    @IsString({ message: "Last name must be a string" })
    @MinLength(3, { message: "Last name must be a minimum of 3 characters" })
    lastName: string;
}