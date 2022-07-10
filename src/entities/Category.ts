import { type } from "os";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Note } from "./Note";
import { User } from "./User";

@Entity("tb_categories")
export class Category {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: "text", nullable: false})
    label: string;

    @ManyToOne((type) => User, (user) => user.id, {
        cascade: true
    })
    user: User;

    @OneToMany(() => Note, (note) => note.id, {
        cascade: true
    })
    notes: Array<Note>

    constructor(label: string) {
        this.label = label;
    }

    
}