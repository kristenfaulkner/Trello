Trello.Routers.TrelloRouter = Backbone.Router.extend({
  routes: {
    "": "boardsIndex",
    "boards/new": "boardsNew",
    "boards/:id": "boardsShowFull"
  },

  boardsIndex: function () {

    var boardsIndexView = new Trello.Views.BoardsIndexView({
      collection: Trello.Collections.boards
    });
    Trello.Collections.boards.fetch();
    this._swapView(boardsIndexView);
  },

  boardsNew: function () {
    var newView = new Trello.Views.BoardsNewView();
    this._swapView(newView);
  },

  boardsShowFull: function (id) {
    var board = Trello.Collections.boards.getOrFetch(id);

    var showView = new Trello.Views.BoardsShowFullView({
      model: board
    });

    this._swapView(showView);
  },

  _swapView: function (newView) {
    if (this.currentView) {
      this.currentView.remove();
    }

    $("#main").html(newView.render().$el);

    this.currentView = newView;
  }
});