import { CartRepository } from "../repositories/CartRepository";

export class CartController {
    static async getProductsCount() {
        const cart = await CartRepository.getCart();
        const count = (cart ?? []).reduce((a, b) => a + b.count, 0);
        return count;
    }

    static async getProducts() {
        const products = await CartRepository.getCart();
        return products;
    }

    static async addToCart(productId) {
        return CartRepository.addToCart(productId);
    }

    static async changeCount(productId, count) {
        if (Number(count) <= 0) {
            return this.deleteFromCart(productId);
        }
        return CartRepository.changeCount(productId, count);
    }

    static async deleteFromCart(productId) {
        return CartRepository.deleteFromCart(productId);
    }
}