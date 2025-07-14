class CartController {
    constructor() {
        this._products = [];
    }

    getAllProducts({ uid }) {
        return this._products.filter(p => p.client_uid === uid);
    }

    addProduct({ id, uid }) {
        const found = this._products.find(p => p.client_uid === uid && p.id === id);

        if (found) {
            found.count++;
        }
        else {
            this._products.push({ id: id, count: 1, client_uid: uid });
        }
    }

    deleteProduct({ id, uid }) {
        this._products = this._products.filter(p => p.client_uid === uid && p.id !== id);
    }
}

module.exports = CartController;