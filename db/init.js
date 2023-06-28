import rawData from "./baseData.js";

import Category from "../server/models/category.js";
import Client from "../server/models/client.js";
import Order from "../server/models/order.js";
import Product from "../server/models/product.js";

export default async function initDB() {
    const categoriesCount = await Category.estimatedDocumentCount();
    const clientsCount = await Client.estimatedDocumentCount();
    const ordersCount = await Order.estimatedDocumentCount();
    const productsCount = await Product.estimatedDocumentCount();

    if (categoriesCount === 0) {
        Category.insertMany(rawData.categories);
    }

    if (clientsCount === 0) {
        Client.insertMany(rawData.clients);
    }

    if (ordersCount === 0) {
        Order.insertMany(rawData.orders);
    }

    if (productsCount === 0) {
        Product.insertMany(rawData.products);
    }
}