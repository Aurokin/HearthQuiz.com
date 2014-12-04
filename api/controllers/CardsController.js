/**
 * CardsController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	InsertCards: function (req, res) {
		
		Object.keys(req.body).forEach(function(set) {

			req.body[set].forEach(function(card) {
				card.set = set;
				card.hearthID = card.id;
				delete card.id;
				card.imageLink = 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/'+card.hearthID+'.png';

				console.log(card);

				if (card.collectible = 'true' && typeof card.collectible !== 'undefined' && card.type != 'Hero') {
					Cards.create(card).exec(function createCB(err, created) {
						console.log(err);
						console.log(created);
					});
				}
			});
		});

		return res.send('Recieved Data');
	}
};
