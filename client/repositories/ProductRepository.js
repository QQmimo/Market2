import { Api } from "../applications/Api";

export class ProductRepository {
    static getAllProducts() {
        return Api.get('/api/products')
    }

    static getProduct(id) {
        return Api.get(`/api/products(${id})`)
    }

    static getProductByCategory(categoryId) {
        return Api.get(`/api/products?category=(${categoryId})`);
    }

    static searchProduct(search) {
        return Api.get(`/api/products?search=${search}`);
    }
}