Trello.Views.CardsNewView = Backbone.CompositeView.extend({
  template: JST["cards/new"],
  // checkItemTemplate: JST["cards/checklistItem"],

  events: {
    "submit form.new-form": "submit"
    // "click #addMoreChecks" : "addChecks"
  },
  initialize: function(options) {
    this.list = options.list;
  },

  render: function () {
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.html(renderedContent);

    return this;
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


  submit: function (event) {
    event.preventDefault();
    var cardView = this;
    var params = $(event.currentTarget).serializeJSON();
    cardView.model.set(params["card"]);
    cardView.model.save({ wait: true}, {
      success: function () {
        cardView.list.cards().add(cardView.model);
        cardView.$('#myModal').modal('hide');
        $('.modal-backdrop').remove();
      }
    });
  }
});
