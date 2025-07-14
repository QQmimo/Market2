const fs = require("fs");

class ProductController {
    constructor() {
        this._allProducts = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`, { encoding: "utf8" }));
    }

    getAllProducts() {
        return this._allProducts;
    }

    getProduct(id) {
        return this._allProducts.find(product => product.id === id);
    }

    searchProduct(searchName) {
        return this._allProducts.filter(product => product.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    }
}

module.exports = ProductController