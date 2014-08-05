Trello.Collections.Boards = Backbone.Collection.extend({
  model: Trello.Models.Board,
  tagName: "ul",
  url: "/api/boards",

  getOrFetch: function (id) {
    var boards = this;
    var board;
    if (board = this.get(id)) {
      board.fetch();
    } else {
      board = new Trello.Models.Board({ id: id });
      board.fetch({
        success: function () { boards.add(board); }
      });
    }

    return board;
  }
});
