import { Api } from "../applications/Api";
import { Client } from "../applications/Client";

export class CartRepository {
    static getCart() {
        return Api.get(`/api/cart(${Client.getOrAddUID()})`);
    }

    static addToCart(productId) {
        return Api.post(`/api/cart(${Client.getOrAddUID()})`, { id: productId });
    }

    static deleteFromCart(productId) {
        return Api.delete(`/api/cart(${Client.getOrAddUID()}))`, { id: productId })
    }
}