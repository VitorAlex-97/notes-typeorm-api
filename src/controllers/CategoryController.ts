import { Request, Response } from "express";
import { User } from "../entities/User";
import { Category } from "../entities/Category";
import { Repository } from "typeorm";
import { UserService } from "../services/user.service";

export class CategoryController {
    constructor(
        private categoryRepository: Repository<Category>,
        private userService: UserService
    ){}
    
    createCategory = async (req: Request, res: Response) => {
        try {
            const [{ userId }, { label }] = [req.params , req.body];
    
            if(!label)
                throw new Error('Label is required');

            const newCategory = new Category(label);

            const userRepo = await this.userService.findOneByIdOrFail(userId);
            
            newCategory.user = userRepo;

            const category: Category = await this.categoryRepository.save(newCategory);

            const { user, ...categoryData } = category;

            res.status(201).json(categoryData);
            
        } catch (err) {
            res.status(400).json({error: err.message}).end();
        }

    }

    getAllCategories = async (req: Request, res: Response) => {
        const { userId } = req.params;

        this.userService.findOneByIdOrFail(userId).then((userRepo) => {
            this.categoryRepository.find({
                where: {
                    user: {
                        id: userId
                    }
                }
            }).then((categoriesRepo) => {
                res.status(200).json(categoriesRepo);
            })
            .catch((e) => {
                console.log(`error >> ${e.message}`);
                res.status(200).json({error: e.message}).end();
            });
            
        }).catch((e) => {
            console.log(`error >> ${e.message}`);
            res.status(400).json({error: e.message}).end();
        });

    }

    updateCategoryLabelByID = async (req: Request, res: Response) => {
        const [{ userId }, { category }, { label }] = [ req.params, req.query, req.body ];

        if(!label){
            return res.status(400).json({error: "Label is required"}).end();
        }

        this.userService.findOneByIdOrFail(userId).then((userRepo) => {
            this.categoryRepository.findOne({
                where: {
                    id: +category
                }
            }).then((categoryRepo) => {
                if(!categoryRepo)
                    throw new Error("Category does not exist");
                
                categoryRepo.label = label;
                this.categoryRepository.save(categoryRepo);
                res.status(200).json({message: "Label was updated"});
            }).catch((e) => {
                console.log(`error >>> ${e.message}`);
                res.status(404).json({error: e.message});
            })
        }).catch((e) => {
            console.log(`error >>> ${e.message}`);
            res.status(400).json({error: e.message});
        });
    }

    deleteCategoryById = async (req: Request, res: Response) => {
        const [{ userId }, { category } ] = [req.params, req.query];

        this.userService.findOneByIdOrFail(userId).then((userRepo) => {
            this.categoryRepository.delete({id: +category}).then((result) => {
                console.log('>>>>>>>> User Category deleted >>>>>>>>>>');
                if(result.affected > 0)
                    res.status(200).json({message: "Category deleted"});
                else 
                    throw  new Error("Category does not exists");
            }).catch((e) => {
                console.log(`error >>> ${e.message}`)
                res.status(400).json({error: e.message});
            })
        }).catch((e) => {
            console.log(`error >>> ${e.message}`);
            res.status(400).json({error: e.message});
        });
    }

}
