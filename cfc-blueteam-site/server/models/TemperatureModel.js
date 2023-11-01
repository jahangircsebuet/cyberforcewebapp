const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { sequelize } = require('.');
const { INTEGER } = require('sequelize');

// export default db;
module.exports = (sequelize, Sequelize) => {
  const Temp = sequelize.define('temperature', {
    val: {
      type: INTEGER
    }
  });

  return Temp;
}