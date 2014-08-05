Trello.Views.BoardsShowFullView = Backbone.CompositeView.extend({
  template: JST["boards/showFull"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    this.listenTo(this.model.lists(), "remove", this.removeList);

    var listsNewView =
      new Trello.Views.ListsNewView({ model: this.model });
    this.addSubview(".lists-new", listsNewView);

    this.model.lists().each(this.addList.bind(this));
  },

  addList: function (list) {
    var listsShowOne =
      new Trello.Views.ListsShowOne({ model: list });
    this.addSubview(".lists", listsShowOne);
  },

  events: {
    "receive .cards" : "sortCards"
  },

  removeList: function (list) {
    var subview = _.find(
      this.subviews(".lists"),
      function (subview) {
        return subview.model === list;
      }
    );

    this.removeSubview(".lists", subview);
},


  sortCards: function(event, ui) {
    var view = this;
    var senderListId = ui.item.find('.card-box').data('list-id');
    var senderList = view.model.lists().get(senderListId);
    var cardId = ui.item.find('.card-box').data('card-id'); //or droppable.find('.card-box').data('card-id')
    var card = senderList.cards().get(cardId);
    var net = $(ui.item);
    var receiverListId = $(net).closest('.data-storage').data('listId');
    var receiverList = view.model.lists().get(receiverListId);
    debugger
    card.set('list_id', receiverListId);
    console.log(card.get('list_id'));
    card.save({'list_id': receiverListId}, {
      success: function () {
            // receiverList.cards().add(card);
            // senderList.cards().remove(card);
            // //add subviews
            // //remove subviews
            alert("saved!");
          }
        });
  },

  render: function () {
    var view = this;
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    $('.lists').sortable();
    $('.cards').sortable({
      connectWith: '.cards',
      forcePlaceholderSize: true,
      cursor: "move",
      dropOnEmpty: true,
      receive: function(event, ui) {
        view.sortCards(event, ui);
      }
    });
    return this;
  }
});
