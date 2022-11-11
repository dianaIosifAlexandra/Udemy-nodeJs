const Product = require("../models/product");

// get add products page
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  // valaorea extrasa este un string, deci editMode va fi = cu "true"
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const productId = req.params.productId;

  req.user
    .getProducts({
      where: {
        id: productId,
      },
    })
    //   Product.findByPk(productId)
    .then((products) => {
      const product = products[0];
      if (!product) return res.redirect("/");

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product,
      });
    })
    .catch((err) => console.log(err));
};

exports.updateProduct = (req, res, nect) => {
  const { productId, title, imageUrl, description, price } = req.body;

  /* versiunea mea
  Product.update(
    {
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    },
    {
      where: {
        id: productId,
      },
    }
  )
    .then((result) => {
      console.log(result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
    */

  // versiunea din curs
  Product.findByPk(productId)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;

      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  //   Product.findAll()
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  // varianta mea
  //   Product.destroy({
  //     where: {
  //       id: productId,
  //     },
  //   })
  //     .then((result) => {
  //       console.log(result);
  //       res.redirect("/admin/products");
  //     })
  //     .catch((err) => console.log(err));

  // din curs
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
