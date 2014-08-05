Trello.Views.BoardsNewView = Backbone.View.extend({
  template: JST["boards/new"],

  events: {
    "submit form": "submit"
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  createExampleCard: function(newList) {
    var view = this;
    var newCard = new Trello.Models.Card();
    newCard.set({
      list_id: newList.get('id'),
      title: "Example Card",
      description: "You can add new lists and cards by clicking the green buttons",
      ord: 1
    });
    newCard.save({}, {
      success: function () {
        newList.cards().add(newCard);
      }
    });
  },

  createExampleList: function(newBoard) {
    var view = this;
    var newList = new Trello.Models.BoardList();
    newList.set({
      board_id: newBoard.get('id'),
      title: "Example List"
    });
    newList.save({}, {
      success: function () {
        newBoard.lists().add(newList);
        view.createExampleCard(newList);
      }
    });
  },

  submit: function (event) {
    event.preventDefault();
    var view = this;
    var params = $(event.currentTarget).serializeJSON();
    var newBoard = new Trello.Models.Board(params["board"]);
    newBoard.save({}, {
      success: function () {
        view.createExampleList(newBoard);
        Trello.Collections.boards.add(newBoard);
      }
    });
  }
});
