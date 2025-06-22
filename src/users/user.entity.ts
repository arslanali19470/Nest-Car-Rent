import { Exclude } from "class-transformer";
import { Report } from "src/reports/reports.entity";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    // ()=>  it is resolving the circular dipendency issue 
    @OneToMany(() => Report, (report) => report.user) // we cant access the report directly without an arrow fx
    report: Report[]

    @Column({ default: false })
    admin: boolean;

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