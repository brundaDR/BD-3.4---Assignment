const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addAnItemToTheCart(cart, productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addAnItemToTheCart(cart, productId, name, price, quantity);
  res.json(result);
});

function editQuantityOfAnItem(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editQuantityOfAnItem(cart, productId, quantity);
  res.json(result);
});

function deleteAnItem(ele, productId) {
  return ele.productId !== productId;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((ele) => deleteAnItem(ele, productId));
  res.json(result);
});

app.get('/cart', (req, res) => {
  res.json(cart);
});

function calculateTotalQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

function calculateTotalPrice(cart) {
  let totalprice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalprice += cart[i].price * cart[i].quantity;
  }
  return totalprice;
}

app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalprice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
