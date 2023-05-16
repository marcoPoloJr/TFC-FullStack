'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('teams', { 
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allownull: false,
        },
      team_name:{
        type:Sequelize.STRING,
        allownull: false,
      }, 
    });
    
  },

  down: async (queryInterface, _Sequelize) => {
     await queryInterface.dropTable('teams');
     
  }
};
