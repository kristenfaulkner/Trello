Trello.Views.CardsShowFullView = Backbone.CompositeView.extend({
  template: JST["cards/showFull"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.items(), "sync", this.render);
    this.listenTo(this.model.items(), "add", this.addItem);
    this.listenTo(this.model.items(), "remove", this.removeItem);
    
    var itemNewView =
      new Trello.Views.ItemNewView({ model: this.model });
    this.addSubview(".add-item", itemsNewView);

    this.model.items().each(this.addItem.bind(this));
  },
  
  render: function () {
    var view = this;
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

    // addCard: function (card) {
    //   var cardsShowOne =
    //     new Trello.Views.CardsShowOne({ model: card });
    //   this.addSubview(".cards", cardsShowOne);
    // },

  //   removeCard: function (card) {
  //     var subview = _.find(
  //       this.subviews(".cards"),
  //       function (subview) {
  //         return subview.model === card;
  //       }
  //     );
  //
  //     this.removeSubview(".cards", subview);
  // },

  
});
