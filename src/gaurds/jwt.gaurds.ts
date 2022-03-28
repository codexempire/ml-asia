import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGaurd implements CanActivate {
    constructor(
        private jwtTokenService: JwtService,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateToken(request);
    }

    validateToken(request): boolean {

        const authHeader: string = request.headers.authorization;

        if (!authHeader) {
            throw new NotFoundException({ error: "Authorization header is required" });
        }

        const token: string = authHeader.split(" ")[1];

        if (!token) {
            throw new NotFoundException({ error: "Bearer token not found" });
        }

        this.jwtTokenService.verify(token);
        return true;
    }
}