import { CartRepository } from "../repositories/CartRepository";

export class CartController {
    static async getProductsCount() {
        const cart = await CartRepository.getCart();
        return (cart?.products ?? []).reduce((a, b) => a + b.count, 0);
    }

    static async getProducts() {
        return (await CartRepository.getCart())?.products ?? [];
    }

    static async addToCart(productId) {
        return CartRepository.addToCart(productId);
    }

    static async changeCount(productId, count) {
        return CartRepository.changeCount(productId, count);
    }

    static async deleteFromCart(productId) {
        return CartRepository.deleteFromCart(productId);
    }
}