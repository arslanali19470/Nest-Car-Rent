import { Exclude } from "class-transformer";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;

    @Column()
    // hide password on response
    @Exclude()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log(`The User Id us ${this.id}`)
    }

    @AfterRemove()
    AfterRemoveFun() {
        console.log(`After Removing Function is Called  ${this.id}`)
    }

    @AfterUpdate()
    AfterUpdateFun() {
        console.log(`After Upadte the Function is called  ${this.id}`)
    }


}