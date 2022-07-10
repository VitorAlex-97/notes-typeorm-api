import { Length } from "class-validator";
import { Column, CreateDateColumn, DatabaseType, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@Entity("tb_notes")
export class Note {
    
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("varchar")
    @Length(3, 40)
    title: string;

    @Column("text")
    @Length(3, 300)
    body: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    editedAt: Date;

    @ManyToOne((type) => User, (user) => user.id, {
        cascade: true
    })
    user: User;

    @ManyToOne((type) => Category, (category) => category.id, {
        cascade: true
    })
    category: Category;


    constructor(title: string, body: string, category: Category, user: User) {
        this.title = title;
        this.body = body;
        this.category = category;
        this.user = user
    }
}