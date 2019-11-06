const functions = require("firebase-functions");
// CONFIG
const SECRET_KEY = "sk_test_ZiREPuDqKVYUhi1m8eMKpjFC00G8QBUIfy"  // PROD functions.config().stripe.secret_key;
// STRIPE
const stripe = require("stripe")(SECRET_KEY);
// EXPRESS 
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, '../build')));
app.use(require("body-parser").text());


app.get("/api/products", async (req, res) => {
  await stripe.products.list((err, products) => {
    if (err) {
      res.send(err);
    } else {
      res.send(products);
    }
  });
});

app.get("/api/list-skus", async (req, res) => {
  const { productId } = req.body;

  await stripe.skus.list(
    {
      limit: 100
    },
    (err, skus) => {
      if (err) {
        res.send(err);
      } else {
        res.send(skus);
      }
    }
  );
});

app.get("/api/:productId", async (req, res) => {
  await stripe.skus.list(
    {product: req.params.productId},
    (err, sku) => {
      if (err) {
        res.send(err);
      } else {
        res.send(sku);
      }
    }
  );
});

app.post("/api/update-sku", async(req, res) => {
  await stripe.skus.update(
    req.body.sku,
    {
      metadata: {
        quantity: req.body.quantity
      }
    }, (err, sku) => {
      if (err) {
        res.send(err);
      } else {
        res.send(sku);
      }
    }
  );
});


app.post("/api/create-order", async(req, res) => {
  await stripe.orders.create({
    currency: 'usd',
    items: req.body.items,
    shipping: req.body.shipping,
    email: req.body.email
  }, (err, order) => {
    if (err) {
      res.send(err);
    } else {
      res.send(order);
    }
  });
});

app.post("/api/pay-order", async(req, res) => {
  const {token} = req.body
  await stripe.orders.pay(
    req.body.orderId,
    {
      source: token
    },
    (err, order) => {
      if (err) {
        res.send(err);
      } else {
        res.send(order);
      }
    }
  );
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname + '../build/index.html'));
});

exports.api = functions.https.onRequest(app);