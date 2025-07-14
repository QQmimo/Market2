import { Api } from "../applications/Api";

export class ProductRepository {
    static getAllProducts() {
        return Api.get('/api/products')
    }

    static getProduct(id) {
        return Api.get(`/api/products(${id})`)
    }

    static searchProduct(search) {
        return Api.get(`/api/products?search=${search}`);
    }
}