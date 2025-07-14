const fs = require("fs");
const ProductController = require("./controllers/ProductController");
const CategoryController = require("./controllers/CategoryController");
const CartController = require("./controllers/CartController");
const express = require("express");
const server = express();

server.use(express.json());
server.use(express.static("public"));

const PORT = 8080;

const productController = new ProductController();
const categoryController = new CategoryController();
const cartController = new CartController();

server.get("/api", (req, res) => {
    res.json({
        paths: [
            { method: 'GET', url: '/api/products', description: "Взять все продукты" },
            { method: 'GET', url: '/api/products?search=:searchName', description: "Взять все продукты в названии которых есть искомый текст" },
            { method: 'GET', url: '/api/products(:id)', description: "Взять продукт по id" },
            { method: 'GET', url: '/api/categories', description: "Взять все категории" },
            { method: 'GET', url: '/api/categories(:id)', description: "Взять категорию по id" },
            { method: 'GET', url: '/api/cart', description: "Взять все товары в корзине" },
            { method: 'POST', url: '/api/cart', description: "Добавить продукт в корзину" },
        ]
    });
});

server.get("/api/products", (req, res) => {
    try {
        const searchName = req.query.search;
        if (searchName) {
            res.json(productController.searchProduct(searchName)).status(200);
        }
        else {
            res.json(productController.getAllProducts());
        }
    }
    catch (er) {
        res.status(500).json({ error: er.message });
    }
});

server.get("/api/products:id", (req, res) => {
    try {
        const id = Number(req.params.id.replace(/[()]/g, ''));
        if (isNaN(id)) {
            res.status(400).json({ error: `Значение 'id' указанное в запросе не является числом` });
            return;
        }

        res.json(productController.getProduct(id)).status(200);
    }
    catch (er) {
        res.status(500).json({ error: er.message });
    }
});


server.get("/api/categories", (req, res) => {
    try {
        res.json(categoryController.getAllCategories()).status(200);
    }
    catch (er) {
        res.status(500).json({ error: er.message });
    }
});

server.get("/api/categories:id", (req, res) => {
    try {
        const id = Number(req.params.id.replace(/[()]/g, ''));
        if (isNaN(id)) {
            res.status(400).json({ error: `Значение 'id' указанное в запросе не является числом` });
            return;
        }

        res.json(categoryController.getCategory(id)).status(200);
    }
    catch (er) {
        res.status(500).json({ error: er.message });
    }
});

server.get("/api/cart", (req, res) => {
    try {
        res.json(cartController.getAllProducts()).status(200);
    }
    catch (er) {
        res.status(500).json({ error: er.message });
    }
});

server.post("/api/cart", (req, res) => {
    try {
        if (!req.body.id) {
            res.status(400).json({ error: `Тело запроса должно содержать поле 'id', которое ссылается на продукт` });
            return;
        }
        cartController.addProduct(req.body);
        return res.sendStatus(200);
    }
    catch (er) {
        res.status(500).json({ error: er.message });
    }
});

server.delete("/api/cart:id", (req, res) => {
    try {
        const id = Number(req.params.id.replace(/[()]/g, ''));
        if (isNaN(id)) {
            res.status(400).json({ error: `Значение 'id' указанное в запросе не является числом` });
            return;
        }

        cartController.deleteProduct(id);
        return res.sendStatus(200);
    }
    catch (er) {
        res.status(500).json({ error: er.message });
    }
});


server.listen(PORT, (er) => { console.log(`Сервер запущен: http://localhost:${PORT}`); });