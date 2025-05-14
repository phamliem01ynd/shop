const { where } = require('sequelize');
const db = require('../models/index');

const addToCart = async (userId) => {
  const cart = await db.User.findOne({ where: { id: userId } });
  
}