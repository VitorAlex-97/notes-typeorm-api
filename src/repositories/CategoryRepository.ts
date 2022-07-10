import { Repository } from "typeorm";
import { Category } from "../entities/Category";

export class CategoryRepository extends Repository<Category> {
    
    categoryExist = async (categorId: number) => {
        const categoryRepo = await this.findOne({
            where: {
                id: categorId
            }
        });

        return !!categoryRepo;
    }
}