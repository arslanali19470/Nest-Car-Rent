import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    approved: boolean

    @Column({ default: false })
    price: number;

    @Column()
    make: string;

    @Column()
    model: string

    @Column()
    year: number

    @Column()
    lng: number

    @Column()
    lat: number


    @Column()
    mileage: number
    // ()=>  it is resolving the circular dipendency issue 
    @ManyToOne(() => User, (user) => user.report) // we cant access the user directly without an arrow fx
    user: User
}