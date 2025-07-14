import { Api } from "../applications/Api";

export class CartRepository {
    static getCard() {
        return Api.get('/api/cart');
    }

    static addToCart(product) {
        return Api.post('/api/cart', product);
    }
}