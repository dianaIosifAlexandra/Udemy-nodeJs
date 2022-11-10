const Product = require('../models/product');

// get add products page 
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, description, price } = req.body;

    const product = new Product(null,title, imageUrl, description, price);
    product.save()
        .then(()=>{
            res.redirect('/');
        })
        .catch(err => console.log(err));
   
}

exports.getEditProduct = (req, res, next) => {
    // valaorea extrasa este un string, deci editMode va fi = cu "true"
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const productId = req.params.productId;
    Product.getProductById(productId, (product)=> {
        if(!product) return res.redirect('/');

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product
        });
    });
}

exports.updateProduct = (req, res, nect) => {
    const { productId, title, imageUrl, description, price } = req.body;

    const product = new Product(productId,title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products',
        });
    });
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.deleteById(productId);

    res.redirect('/admin/products');
};
