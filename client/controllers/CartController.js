import { CartRepository } from "../repositories/CartRepository";

export class CartController {
    static async getProductsCount() {
        const products = await CartRepository.getCard();
        return products.reduce((a, b) => a + b.count, 0);
    }

    static async getProducts() {
        return CartRepository.getCard();
    }

    static async addToCart(productId) {
        CartRepository.addToCart({ id: productId });
    }
}