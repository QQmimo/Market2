class CartController {
    constructor() {
        this._carts = [];
    }

    async getCart({ uid }) {
        return new Promise(resolve => {
            resolve(this._carts.find(p => p.client_uid === uid)?.products ?? []);
        });
    }

    async addProduct({ id, uid }) {
        return new Promise(resolve => {
            const foundCart = this._carts.find(c => c.client_uid === uid);

            if (foundCart) {
                const foundProduct = foundCart.products.find(p => p.id === id);
                if (foundProduct) {
                    foundProduct.count += 1;
                }
                else {
                    foundCart.products.push({ id: id, count: 1 });
                    foundCart.date = new Date();
                }
            }
            else {
                this._carts.push({ date: new Date(), client_uid: uid, products: [{ id: id, count: 1 }] });
            }
            resolve();
        });
    }

    async changeProduct({ id, count, uid }) {
        return new Promise((resolve) => {
            const foundCart = this._carts.find(c => c.client_uid === uid);
            if (!foundCart) {
                throw new Error(`Корзины на нейдено.`);
            }

            const foundProduct = foundCart.products.find(p => p.id == id);
            if (!foundProduct) {
                throw new Error(`В корзине нужного продукта`);
            }

            foundProduct.count = count;
            resolve(foundCart);
        });
    }

    async deleteProduct({ id, uid }) {
        return new Promise(resolve => {
            const foundCart = this._carts.find(c => c.client_uid === uid);
            if (!foundCart) {
                throw new Error(`Корзины на нейдено.`);
            }

            foundCart.products = foundCart.products.filter(p => p.id !== id);
            foundCart.date = new Date();
            resolve();
        });
    }
}

module.exports = CartController;