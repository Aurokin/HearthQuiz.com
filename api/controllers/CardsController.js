/**
 * CardsController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	InsertCards: function (req, res) {

		//console.log(req.body);
		console.log(req.body.Basic);

		return res.send('Recieved Data');
	}
};
