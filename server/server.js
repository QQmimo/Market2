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
        if (req.query.search) {
            return res.status(200).json(productController.searchProduct(req.query.search));
        }
        else if (req.query.category) {
            return res.status(200).json(productController.searchByCategory(req.query.category));
        }
        else {
            return res.status(200).json(productController.getAllProducts());
        }
    }
    catch (er) {
        return res.status(500).json({ error: er.message });
    }
});

server.get("/api/products:id", (req, res) => {
    try {
        const id = Number(req.params.id.replace(/[()]/g, ''));
        if (isNaN(id)) {
            return res.status(400).json({ error: `Значение 'id' указанное в запросе не является числом` });
        }

        res.json(productController.getProduct(id)).status(200);
    }
    catch (er) {
        return res.status(500).json({ error: er.message });
    }
});


server.get("/api/categories", (req, res) => {
    try {
        return res.json(categoryController.getAllCategories()).status(200);
    }
    catch (er) {
        return res.status(500).json({ error: er.message });
    }
});

server.get("/api/categories:id", (req, res) => {
    try {
        const id = Number(req.params.id.replace(/[()]/g, ''));
        if (isNaN(id)) {
            return res.status(400).json({ error: `Значение 'id' указанное в запросе не является числом` });
        }

        return res.json(categoryController.getCategory(id)).status(200);
    }
    catch (er) {
        return res.status(500).json({ error: er.message });
    }
});


server.get("/api/cart:uid", async (req, res) => {
    try {
        const uid = req.params.uid.replace(/[()]/g, '');
        return res.json(await cartController.getCart({ uid: uid })).status(200);
    }
    catch (er) {
        return res.status(500).json({ error: er.message });
    }
});

server.post("/api/cart:uid", async (req, res) => {
    try {
        const uid = req.params.uid.replace(/[()]/g, '');
        if (!req.body.id) {
            return res.status(400).json({ error: `Тело запроса должно содержать поле 'id', которое ссылается на продукт` });
        }
        await cartController.addProduct({ ...req.body, uid: uid });
        return res.sendStatus(200);
    }
    catch (er) {
        return res.status(500).json({ error: er.message });
    }
});

server.patch("/api/cart:uid", async (req, res) => {
    try {
        const uid = req.params.uid.replace(/[()]/g, '');
        if (!req.body.id) {
            return res.status(400).json({ error: `Тело запроса должно содержать поле 'id', которое ссылается на продукт` });
        }
        if (!req.body.count) {
            return res.status(400).json({ error: `Тело запроса должно содержать поле 'count', которое содержит количество продукта в корзине` });
        }
        const response = await cartController.changeProduct({ ...req.body, uid: uid });
        return res.json(response);
    }
    catch (er) {
        return res.status(500).json({ error: er.message });
    }
});

server.delete("/api/cart:uid", async (req, res) => {
    try {
        const uid = req.params.uid.replace(/[()]/g, '');
        if (!req.body.id) {
            return res.status(400).json({ error: `Тело запроса должно содержать поле 'id', которое ссылается на продукт` });
        }

        await cartController.deleteProduct({ id: req.body.id, uid: uid });
        return res.sendStatus(200);
    }
    catch (er) {
        return res.status(500).json({ error: er.message });
    }
});


server.listen(PORT, (er) => { console.log(`Сервер запущен: http://localhost:${PORT}`); });