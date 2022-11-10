const fs = require('fs');
const path = require('path');

const filePath = require('../util/path');
const myPath = path.join(filePath, 'data', 'products.json');

const Cart = require('./cart');

const getProductsFromFile = (callback) => {
    fs.readFile(myPath, (err, fileContent) => {
        if (err) {
            callback([])
        }
        else {
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        /* in situatia de mai jos: products.push(this); scris direct in save(), this se refera la obiectul creat pe baza clasei 
         si este exact obiectul pe care vreau sa il adaug */
        // products.push(this);

        getProductsFromFile((products) => {
            /* this se refera la clasa deoarece este chemat intr-un arrow function, 
                      daca era un simplu function, this facea referire la scope-ul functiei*/
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;

                fs.writeFile(myPath, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            }
            else {
                this.id = Math.random().toString();
                products.push(this);

                fs.writeFile(myPath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }

        });
    };

    static deleteById(id) {
        getProductsFromFile((products) => {
            const product = products.find(prod => prod.id === id);
            const filteredProducts = products.filter(prod => prod.id !== id);

            fs.writeFile(myPath, JSON.stringify(filteredProducts), (err) => {
                if(!err) {
                    Cart.deleteProduct(id,product.price);
                }
            });
        });
    }

    /*permite apelarea acestei functii direct din clasa, fara a ma folosi de un obiect instantiat */
    static fetchAll(callback) {
        getProductsFromFile(callback);
    };

    static getProductById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find((product) => product.id === id);
            callback(product);
        });
    };
}