const Product = require("../models/product");

const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Product list",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;

  // versiunea mea
  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));

//   Product.findAll({
//     where: {
//       id: productId,
//     },
//   })
//     .then((products) => {
//       res.render("shop/product-detail", {
//         product: products[0],
//         pageTitle: products[0].title,
//         path: "/products",
//       });
//     })
//     .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));

  //   Product.fetchAll()
  //     .then(([rows, fieldData]) => {
  //       res.render("shop/product-list", {
  //         prods: rows,
  //         pageTitle: "Shop",
  //         path: "/",
  //       });
  //     })
  //     .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCartProducts((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            quantity: cartProductData.quantity,
          });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        prods: cartProducts,
      });
    });
  });
};

exports.addToCart = (req, res, next) => {
  const productId = req.body.productId;
  
  Product.getProductById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });

  res.redirect("/cart");
};

exports.postDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;

  Product.getProductById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
