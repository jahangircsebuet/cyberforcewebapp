const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { sequelize } = require('.');
const { INTEGER } = require('sequelize');

// export default db;
module.exports = (sequelize, Sequelize) => {
  const Eff = sequelize.define('efficiencies', {
    val: {
      type: INTEGER
    }
  });

  return Eff;
}