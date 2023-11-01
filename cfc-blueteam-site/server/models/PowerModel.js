const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { sequelize } = require('.');
const { INTEGER, STRING } = require('sequelize');

// export default db;
module.exports = (sequelize, Sequelize) => {
  const Power = sequelize.define('power', {
    month: {
      type: STRING
    },
    avg_pwr_gen: {
        type: INTEGER
    },
    avg_usage: {
        type: INTEGER
    }
  });

  return Power;
}