import { Api } from "../applications/Api";

export class CategoryRepository {
    static getAllCategories() {
        return Api.get('/api/categories');
    }

    static getCategory(id) {
        return Api.get(`/api/categories(${id})`);
    }
}