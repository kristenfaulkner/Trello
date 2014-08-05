Trello.Views.ListsNewView = Backbone.View.extend({
  template: JST["lists/new"],

  events: {
    "submit form": "submit"
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  submit: function (event) {
    var listView = this;
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    var newList = new Trello.Models.BoardList(params["list"]);
    newList.set('board_id', this.model.get('id'));
    newList.save({}, {
      success: function () {
        listView.model.lists().add(newList);
        listView.$('input').val("");
      }
    });
  }
});