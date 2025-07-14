import { CartRepository } from "../repositories/CartRepository";

export class CartController {
    static async getProductsCount() {
        const products = await CartRepository.getCart();
        return products.reduce((a, b) => a + b.count, 0);
    }

    static async getProducts() {
        return CartRepository.getCart();
    }

    static async addToCart(productId) {
        CartRepository.addToCart(productId);
    }

    static async deleteFromCart(productId) {
        CartRepository.deleteFromCart(productId);
    }
}