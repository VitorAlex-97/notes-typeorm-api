import { Router } from "express";
import { Commons } from "../commons/Commons";
import { NoteController } from "../controllers/NoteController";
import { AppDataSource } from "../db/dataSource";
import { Category } from "../entities/Category";
import { Note } from "../entities/Note";
import { User } from "../entities/User";

const router = Router();

const userRepository = AppDataSource.getRepository(User);
const noteRepository = AppDataSource.getRepository(Note);
const categoryRepository = AppDataSource.getRepository(Category);
const UserCommon = new Commons(userRepository, categoryRepository, noteRepository);

const noteController = new NoteController(
    noteRepository, 
    userRepository, 
    categoryRepository, 
    UserCommon
    );



router.post('/new/:userId', noteController.createNotes);
router.patch('/update/:userId', noteController.updateNote);


export default router;