import { Injectable, NestMiddleware } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userservices: UsersService) { }
    async use(req: any, res: any, next: (error?: any) => void) {
        const { userId } = req.session || {}

        if (userId) {
            if (!userId) {
                return "user Id undefined im Current user Middelware "
            }
            const user = await this.userservices.findOne(userId)
            req.currentUser = user;
        }

        next()
    }


}