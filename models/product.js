const fs = require('fs');
const path = require('path');

const filePath = require('../util/path');
const myPath = path.join(filePath, 'data', 'products.json');

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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        /* in situatia de mai jos: products.push(this); scris direct in save(), this se refera la obiectul creat pe baza clasei 
         si este exact obiectul pe care vreau sa il adaug */
        // products.push(this);

        this.id = Math.random().toString();
        getProductsFromFile((products) => {
            /* this se refera la clasa deoarece este chemat intr-un arrow function, 
                      daca era un simplu function, this facea referire la scope-ul functiei*/
            products.push(this);

            fs.writeFile(myPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    /*permite apelarea acestei functii direct din clasa, fara a ma folosi de un obiect instantiat */
    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static getProductById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find((product) => product.id === id);
            callback(product);
        })
    }
}