class CartController {
    constructor() {
        this._products = [];
    }

    getAllProducts() {
        return this._products;
    }

    addProduct(product) {
        const found = this._products.find(p => p.id === product.id);

        if (found) {
            found.count++;
        }
        else {
            this._products.push({ ...product, count: 1 });
        }
    }

    deleteProduct(id) {
        this._products = this._products.filter(p => p.id !== id);
    }
}

module.exports = CartController;