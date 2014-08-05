Trello.Collections.BoardLists = Backbone.Collection.extend({
  model: Trello.Models.BoardList,
  tagName: "ul",
  url: "api/lists",

  comparator: function(list) {
    return list.get('ord');
  },

  getOrFetch: function (id) {
    var lists = this;
    var list;
    if (list = this.get(id)) {
      list.fetch();
    } else {
      list = new Trello.Models.BoardList({ id: id });
      list.fetch({
        success: function () { lists.add(list); }
      });
    }

    return list;
  }
});
