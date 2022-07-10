import { Repository } from "typeorm";
import { User } from "../entities/User";

export class UserRepository extends Repository<User> {

    userExist = async (userId: string) => {
        const userRepo = await this.findOne({
            where: {
                id: userId
            }
        });

        return !!userRepo;
    }
    

}