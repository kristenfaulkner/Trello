Trello.Views.CardsShowOne = Backbone.CompositeView.extend({
  template: JST["cards/showOne"],
  events: {
  "mouse .card-box" : "hilightCard",
  "mouseleave .card-box" : "hilightCard",
  "click .edit-card" : "editCardForm",
  "click button.delete-card": "deleteCard",
  "submit form#edit-form" : "submit"
},

  initialize: function (options) {
    this.list = options.list;
    this.listenTo(this.model, "sync", this.render);
},

  render: function () {
    var view = this;
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  editCardForm: function(event) {
    this.$('#editModal').modal("show");
    // var view = this;
    // var cardEditView = new Trello.Views.CardsEditView({
    //   model: view.model,
    //   list: view.list
    // });
    // view.$el.append(cardEditView.render().$el);
  },

  deleteCard: function(event) {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this card? This action cannot be undone.")) {
      this.model.destroy();
      alert("Card deleted");
    }
  },


  submit: function(event) {
    event.preventDefault();
    var view = this;
    var cardView = this;
    var params = this.$('#edit-form').serializeJSON();
    view.model.set(params["card"]);
    console.log(view.model.id);
    debugger
    view.model.save({ wait: true }, {
      success: function () {
        view.list.cards().add(view.model);
        view.$('.edit-card-form').modal('hide');
        $('.modal-backdrop').remove();
      }
    });
  }
});
