const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');

function getData() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading data.json:", err.message);
    return { users: [], products: [], categories: [], feedbacks: [] };
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing data.json:", err.message);
  }
}

// User Functions
async function createUser(user) {
  const data = getData();
  const newUser = { ...user, id: (data.users.length ? Math.max(...data.users.map(u => u.id)) + 1 : 1), created_at: new Date().toISOString() };
  data.users.push(newUser);
  saveData(data);
  return newUser;
}

async function findUserByLogin(login) {
  const data = getData();
  return data.users.find(u => u.email === login || u.username === login);
}

async function getAllUsers() {
  const data = getData();
  return data.users.map(({ password, ...u }) => u);
}

async function deleteUser(id) {
  const data = getData();
  const initialLen = data.users.length;
  data.users = data.users.filter(u => u.id !== Number(id));
  saveData(data);
  return data.users.length !== initialLen;
}

// Category Functions
async function getCategories() {
  const data = getData();
  return data.categories || [];
}

async function createCategory(name) {
  const data = getData();
  const newCat = { id: (data.categories.length ? Math.max(...data.categories.map(c => c.id)) + 1 : 1), name };
  data.categories.push(newCat);
  saveData(data);
  return newCat;
}

// Product Functions
async function listProducts() {
  const data = getData();
  const products = data.products || [];
  const categories = data.categories || [];
  return products.map(p => ({
    ...p,
    category: categories.find(c => c.id === Number(p.category_id))?.name || 'General'
  }));
}

async function createProduct(product) {
  const data = getData();
  const newProd = { ...product, id: (data.products.length ? Math.max(...data.products.map(p => p.id)) + 1 : 1), created_at: new Date().toISOString() };
  data.products.push(newProd);
  saveData(data);
  return newProd;
}

async function updateProduct(id, updates) {
  const data = getData();
  const idx = data.products.findIndex(p => p.id === Number(id));
  if (idx === -1) return null;
  data.products[idx] = { ...data.products[idx], ...updates };
  saveData(data);
  return data.products[idx];
}

async function deleteProduct(id) {
  const data = getData();
  const initialLen = data.products.length;
  data.products = data.products.filter(p => p.id !== Number(id));
  saveData(data);
  return data.products.length !== initialLen;
}

// Feedback Functions
async function createFeedback(f) {
  const data = getData();
  const newFeedback = { ...f, id: (data.feedbacks.length ? Math.max(...data.feedbacks.map(fb => fb.id)) + 1 : 1), created_at: new Date().toISOString() };
  data.feedbacks.push(newFeedback);
  saveData(data);
  return newFeedback;
}

async function listFeedbacks() {
  const data = getData();
  return data.feedbacks || [];
}

async function deleteFeedback(id) {
  const data = getData();
  const initialLen = data.feedbacks.length;
  data.feedbacks = data.feedbacks.filter(f => f.id !== Number(id));
  saveData(data);
  return data.feedbacks.length !== initialLen;
}

async function createOrder(order) {
  const data = getData();
  const newOrder = { ...order, id: (data.orders?.length ? Math.max(...data.orders.map(o => o.id)) + 1 : 1), created_at: new Date().toISOString() };
  if (!data.orders) data.orders = [];
  data.orders.push(newOrder);
  saveData(data);
  return newOrder;
}

async function listOrders() {
  const data = getData();
  return data.orders || [];
}

module.exports = {
  createUser, findUserByLogin, getAllUsers, deleteUser,
  getCategories, createCategory,
  listProducts, createProduct, updateProduct, deleteProduct,
  createOrder, listOrders,
  createFeedback, listFeedbacks, deleteFeedback
};
