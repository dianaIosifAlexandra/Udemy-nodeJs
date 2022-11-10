
const Product = require('../models/product');

const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'Product list',
                path: '/products',
            });

        })
        .catch(err => console.log(err));

    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Product list',
            path: '/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
}

exports.getProductById = (req, res, next) => {
    const productId = req.params.productId;

    Product.getProductById(productId).then(([product]) => {
        res.render('shop/product-detail', {
            product: product[0],
            pageTitle: product[0].title,
            path: '/products',
        });
    }).catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/',
            });

        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    Cart.getCartProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.push({ productData: product, quantity: cartProductData.quantity });
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                prods: cartProducts
            });
        });
    });
};

exports.addToCart = (req, res, next) => {
    const productId = req.body.productId;

    console.log(productId);
    Product.getProductById(productId, (product) => {
        Cart.addProduct(productId, product.price);
    });

    res.redirect('/cart');
}

exports.postDeleteCartItem = (req, res, next) => {
    const productId = req.body.productId;

    Product.getProductById(productId, product => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}