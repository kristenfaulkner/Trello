Trello.Views.ListsShowOne = Backbone.CompositeView.extend({
  template: JST["lists/showOne"],
  className: "col-xs-3 list-box",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);
    this.model.cards().each(this.addCard.bind(this));
},

  events: {
    "click button.delete-list": "deleteList",
    "click button.add-card" : "newCardForm"
  },

  removeCard: function (card) {
    var view = this;
    var subview = _.find(
      view.subviews(".cards"),
      function (subview) {
        return subview.model === card;
      }
    );
    view.removeSubview(".cards", subview);
  },

  deleteList: function(event) {
    if (confirm("Are you sure you want to delete this list? This action cannot be undone.")) {
      event.preventDefault();
      this.model.destroy();
      alert("List deleted");
    }
  },

  newCardForm: function() {
    var view = this;
    var newCard = new Trello.Models.Card();
    newCard.set("list_id", view.model.get('id'));
    var cardNewView = new Trello.Views.CardsNewView({
      list: view.model,
      model: newCard
    });
    this.$el.append(cardNewView.render().$el);
  },

  render: function () {
    var view = this;
    var renderedContent = this.template({
      list: this.model
    });
    view.subviews()['.cards'] = _.sortBy(this.subviews('.cards'),
      function(subview) {
          return subview.model.get('ord');
      });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  addCard: function (card) {
    var view = this;
    var cardsShowOne =
      new Trello.Views.CardsShowOne({
        list: view.model,
        model: card
      });
    this.addSubview(".cards", cardsShowOne);
  },

});
