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
      return this.get('match_groups').length > 0;
    },

    formattedGroups: function() {
      var i = 0;
      group_names = this.get('group_names');
      return _.map(this.get('match_groups'), function(group){  id = i++; return { id: group_names[id] || id, capture: group }; });
    },

    initialize: function() {
      console.log('Loading YARRE model defaults');
    }
  });

  // View
  yarre.YarreGroupsView = Backbone.View.extend({
    el: $("#yarre-result-groups-container"),

    initialize: function() {
      this.template = _.template($("#yarre-result-groups-template").html());

      this.model.on('change:match_groups change:group_names', this.render, this);
    },

    render: function() {
      $(this.el).html(''); // cleanning DOM

      if (this.model.hasGroups()) {
        var renderedContent = this.template({
          groups: this.model.formattedGroups()
        });
        $(this.el).html(renderedContent);
      }
    }
  });

  yarre.YarreResultView = Backbone.View.extend({
    el: $("#yarre-result-container"),

    initialize: function() {
      this.template = _.template($("#yarre-result-template").html());
      this.groupsView = new yarre.YarreGroupsView({ model: this.model });

      this.model.on('change:match_result', this.render, this);
    },

    render: function() {
      $(this.el).html(''); // cleanning DOM

      if (this.model.get('match_result').length > 0) {
        var renderedContent = this.template({
          model: this.model
        });
        $(this.el).html(renderedContent);
      }
    }
  });

  // Backbone initialization
  yarre.ymodel = new yarre.YarreModel();
  yarre.yResultView = new yarre.YarreResultView({ model: yarre.ymodel });
  yarre.groupsView = new yarre.YarreGroupsView({ model: yarre.ymodel });

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
      && _.last($('#pattern').val().split('')) != '\\'; // Do not ends with a backslash
      // && $('#content').val()!= '';
  }

  // DOM events registration
  $('#pattern').keyup(updateCallback);
  $('#modifiers').keyup(updateCallback);
  $('#content').keyup(updateCallback);
});
