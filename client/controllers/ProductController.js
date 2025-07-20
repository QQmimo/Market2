import { ProductRepository } from "../repositories/ProductRepository"

export class ProductController {
    static async getAllProducts() {
        return ProductRepository.getAllProducts();
    }

    static async getProduct(id) {
        return ProductRepository.getProduct(id);
    }

    static async getProductByCategory(categoryId) {
        return ProductRepository.getProductByCategory(categoryId);
    }

    static async searchProducts(search) {
        return ProductRepository.searchProduct(search);
    }
}