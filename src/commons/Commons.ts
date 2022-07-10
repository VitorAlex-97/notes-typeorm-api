import { Repository } from "typeorm";
import { Category } from "../entities/Category";
import { Note } from "../entities/Note";
import { User } from "../entities/User";

export class Commons {
    constructor(
        private userRepository: Repository<User>,
        private categoryRepository: Repository<Category>,
        private noteRepository: Repository<Note>
    ){}
    
    userExist = async (userId: string): Promise<User> => {

        const userRepo: User = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
        if(!userRepo)
            throw new Error('User does not exist');

        return userRepo;
    }

    categoryExist = async (categoryId: number): Promise<Category> => {
        const noteRepo = await this.categoryRepository.findOne({
            where: {
                id: categoryId
            }
        });
        if(!noteRepo)
            throw new Error('Category does not exist');

        return noteRepo;
    }

    noteExist =  async (noteId: number): Promise<Note> => {
        const noteRepo: Note = await this.noteRepository.findOne({
            where: {
                id: noteId
            }
        });
        if(!noteRepo)
            throw new Error('Note does not exist');

        return noteRepo;
    }

    
}