Trello.Collections.Cards = Backbone.Collection.extend({
  model: Trello.Models.Card,
  url: "api/cards",

  comparator: function(card) {
    return card.get('ord');
  },

  getOrFetch: function (id) {
    var cards = this;
    var card;
    if (card = this.get(id)) {
      card.fetch();
    } else {
      card = new Trello.Models.Card({ id: id });
      card.fetch({
        success: function () { cards.add(card); }
      });
    }
    
    return card;
  }
});
