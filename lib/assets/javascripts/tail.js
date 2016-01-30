$(document).foundation();

$(document).ready(function(){

  window.yarre = {};

  // Model
  yarre.YarreModel = Backbone.Model.extend({
    urlRoot: '/process',

    defaults: {
      // Inputs
      pattern: '',
      modifiers: '',
      content: '',
      // Results
      match_result: '',
      match_groups: [],
      group_names: []
    },

    hasGroups: function() {
      return this.get("match_groups").length > 0;
    },

    initialize: function() {
      console.log('Loading YARRE model defaults');
    }
  });

  // View
  yarre.YarreView = Backbone.View.extend({
    el: $("#yarre-result-container"),

    initialize: function() {
      this.template = _.template($("#yarre-result-template").html());

      this.model.on('change:match_result change:match_groups change:group_names', this.render, this);
    },

    render: function() {
      $(this.el).html(''); // cleanning DOM

      var renderedContent = this.template({
        model: this.model
      });
      $(this.el).html(renderedContent);
    }
  });

  // Initialization
  yarre.ymodel = new yarre.YarreModel();
  yarre.yview = new yarre.YarreView({ model: yarre.ymodel });
  // yarre.yview.render();

  // Update model with new data from server
  var updateCallback = function() {
    if (canBeUpdated()) {
      yarre.ymodel.save({
        pattern: $('#pattern').val(),
        modifiers: $('#modifiers').val(),
        content: $('#content').val()
      });
    }
  };
  var canBeUpdated = function() {
    return $('#pattern').val() != ''
      && _.last($('#pattern').val().split('')) != '\\' // Do not ends with a backslash
      && $('#content').val()!= '';
  }

  // DOM events registration
  $('#pattern').keyup(updateCallback);
  $('#modifiers').keyup(updateCallback);
  $('#content').keyup(updateCallback);
});
