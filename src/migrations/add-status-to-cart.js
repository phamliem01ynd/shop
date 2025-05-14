"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Carts", "status", {
      type: Sequelize.INTEGER,
      allowNull: true, // hoặc false tùy theo yêu cầu
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Carts", "status");
  },
};
