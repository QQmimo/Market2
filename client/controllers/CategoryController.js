import { CategoryRepository } from "../repositories/CategoryRepository";

export class CategoryController {
    static async getAllCategories() {
        return CategoryRepository.getAllCategories();
    }
}