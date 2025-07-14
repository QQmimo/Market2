const fs = require("fs");

class CategoryController {
    constructor() {
        this._allProducts = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`, { encoding: "utf8" }));
    }

    getAllCategories = () => {
        return this._allProducts
            .map(p => p.category)
            .filter((c, i, a) => a.findIndex(x => x.id === c.id) === i);
    }

    getCategory = (id) => {
        return this.getAllCategories().find(category => category.id === id);
    }
}

module.exports = CategoryController