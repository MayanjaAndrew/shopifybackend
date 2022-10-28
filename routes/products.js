const router = require("express").Router();
const Products = require("../models/products.model");

router.route("/").get((req, res) => {
  Products.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const productname = req.body.productname;
  const description = req.body.description;
  const quantity = Number(req.body.quantity);
  /*const date = Date.parse(req.body.date);**/

  const newProduct = new Products({
    productname,
    description,
    quantity,
  });

  newProduct
    .save()
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Products.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Products.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Products.findById(req.params.id)
    .then((product) => {
      product.username = req.body.productname;
      product.description = req.body.description;
      product.quantity = Number(req.body.quantity);
      /*product.date = Date.parse(req.body.date);**/

      product
        .save()
        .then(() => res.json("Product updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
