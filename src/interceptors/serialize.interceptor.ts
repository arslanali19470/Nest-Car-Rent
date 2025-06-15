import { applyDecorators, CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";
import { userDto } from "src/users/dtos/user.dto";

// interface of a generic class 
interface classConstructor {
    new(...args: any[]): {}
}
// make own decorator:
export function Serialize(dto: classConstructor) {
    return applyDecorators(
        UseInterceptors(new SerializeInterceptor(dto)),
    );
}


export class SerializeInterceptor implements NestInterceptor {
    //this constructor will received the argument as a parameter
    constructor(private dto: any) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // The code which want to run before
        console.log("I am Before the request go to server");

        return next.handle().pipe(
            map((data: any) => {
                console.log("I am runing Before the response go to client ")
                // return plainToClass(userDto, data, {
                return plainToClass(this.dto, data, {
                    // this line only the the expose value not all 
                    excludeExtraneousValues: true
                })
            })
        )
    }
}