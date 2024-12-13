import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RecrutmentStatus } from "../enums/recrutment.status";
import { AutoMap } from "@automapper/classes";


@Entity({name:"recruitment"})
export class RecrutmentEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column({ type: "decimal", name: "offered_salary"})
    offered_salary: number;

    @AutoMap()
    @Column({type: "varchar", name: "offered_currency"})
    currency: string;

    @AutoMap()
    @Column({type: "varchar", name: "vacancy_reference"})
    vacancy_reference: string;

    @AutoMap()
    @Column("text")
    status: RecrutmentStatus;

    @AutoMap()
    @Column({name: "last_update", type: 'timestamptz'})
    lastUpdate: Date;

    @AutoMap()
    @Column({name: "create_date", type: 'timestamptz'})
    createDate: Date;
}