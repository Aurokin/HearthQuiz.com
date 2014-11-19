/**
* Cards.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      hearthID: {
        type: 'string'
      },
      
      name: {
        type: 'string'
      },

      type: {
        type: 'string'
      },

      faction: {
        type: 'string'
      },

      rarity: {
        type: 'string'
      },

      cost: {
        type: 'integer'
      },

      attack: {
        type: 'integer'
      },

      health: {
        type: 'integer'
      },

      text: {
        type: 'string'
      },

      race: {
        type: 'string'
      },

      playerClass: {
        type: 'string'
      },

      mechanics: {
        //Should Probably Be Array
        type: 'string'
      },

      imageLink: {
        type: 'string'
      }
  }
};
