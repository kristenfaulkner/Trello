Trello.Views.CardsEditView = Backbone.CompositeView.extend({
  template: JST["cards/formEdit"],
  // checkItemTemplate: JST["cards/checklistItem"],

  events: {
    //  "click #addMoreChecks" : "addChecks",
     "submit form.edit-form": "submit",
  },

  initialize: function (options) {
    this.list = options.list;
    this.$('#editModal').modal("show");
    // var itemNewView =
//       new Trello.Views.ItemNewView({ model: this.model });
//     this.addSubview(".add-item", itemsNewView);
//
//     this.model.items().each(this.addItem.bind(this));
  },

  // addChecks: function(event) {
  //   event.preventDefault();
  //   var val = $('#addChecksInput').val();
  //   var newItem = this.checkItemTemplate({
  //     item: val
  //   });
  //   this.$('#card-checklist').append(newItem);
  //   $('#addChecksInput').val("");
  // },

  render: function () {
    var view = this;
    this.$('#editModal').modal('show');
    // var renderedContent = view.template({ card: view.model });
    // view.$el.html(renderedContent);
    // view.attachSubviews();
    return view;
  },

  submit: function (event) {
    event.preventDefault();
    var cardView = this;
    var params = $(event.currentTarget).serializeJSON();
    cardView.model.set(params["card"]);
    cardView.model.save({ wait: true }, {
      success: function () {
        cardView.list.cards().add(cardView.model);
        cardView.$('#myModal').modal('hide');
        $('.modal-backdrop').remove();
      }
    });
  }

});
