import { type } from "os";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Note } from "./Note";
import { User } from "./User";

@Entity("tb_categories")
export class Category {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "text", nullable: false})
    label: string;

    @ManyToOne((type) => User )
    @JoinColumn()
    user: User;

    @OneToMany((type) => Note, category => Category)
    notes: Array<Note>

    constructor(label: string) {
        this.label = label;
    }

    
}