const fs = require('fs');
const path = require('path');

const filePath = require('../util/path');
const myPath = path.join(filePath, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previus cart
        fs.readFile(myPath, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0,
            }

            if (!err) {
                cart = JSON.parse(fileContent);
            }

            // anlayze the car => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            // add new product + increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = {
                    id: id, quantity: 1
                };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + productPrice;

            fs.writeFile(myPath, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    };

    static deleteProduct(id, productPrice) {
        fs.readFile(myPath, (err, fileContent) => {
            if (err) {
                return;
            }

            const updatedCart = { ...JSON.parse(fileContent) };

            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }

            const productQuantity = product.quantity;

            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQuantity;

            fs.writeFile(myPath, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    };

    static getCartProducts = (callback) => {
        fs.readFile(myPath, (err, fileContent) => {
            const cart = JSON.parse(fileContent);

            if (err) {
                callback(null);
            }
            else {
                callback(cart);
            }
        });
    }
}