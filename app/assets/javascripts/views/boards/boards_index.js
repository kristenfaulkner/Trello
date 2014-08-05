Trello.Views.BoardsIndexView = Backbone.CompositeView.extend({
  template: JST["boards/index"],
  tagName: "ul",
  
  initialize: function(options) {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection,"add", this.addBoard);
    this.listenTo(this.collection,"remove", this.removeBoard);
    
    var boardsNewView = new Trello.Views.BoardsNewView({ model: this.model });
     this.addSubview(".boards-new", boardsNewView);
     this.collection.each(this.addBoard.bind(this));
  },
  
  addBoard: function (board) {
      var boardsShowOne =
        new Trello.Views.BoardsShowOne({ model: board });
      this.addSubview(".boards", boardsShowOne);
    },
 
  removeBoard: function (board) {
      var subview = _.find(
        this.subviews(".boards"),
        function (subview) {
          return subview.model === board;
        }
      );
      this.removeSubview(".boards", subview);
    },
 
 
  render: function () {
    var view = this;
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
});

