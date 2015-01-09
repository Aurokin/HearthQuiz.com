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

				if (typeof card.playerClass === 'undefined') {
					card.playerClass = 'Neutral';
				}

				if (card.collectible = 'true' && typeof card.collectible !== 'undefined' && card.type != 'Hero') {
					Cards.create(card).exec(function createCB(err, created) {
						if (err) {
							res.send('Card Could Not Be Added To Database');
						}
					});
				}
			});
		});

		return res.send('Recieved Data');
	},

	CustomQuiz: function (req, res) {
		var qClass = req.body.qClass;
		var qType = req.body.qType;
		var qSet = req.body.qSet;

		if (qClass === 'All') {
			qClass = '';
		}

		if (qType === 'All') {
			qType = '';
		}

		if (qSet === 'All') {
			qSet = '';
		}

		Cards.find().where({
			playerClass : {'startsWith' : qClass},
			type : {'startsWith' : qType},
			set : {'startsWith' : qSet}
		}).exec(function(err, cards) {
				res.send(cards);
		});
	}
};
