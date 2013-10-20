
var Text = Rectangle.extend({
  type: "text",

  initialize: function(attrs) {
    this.strokeColor = attrs.strokeColor || attributes.get("strokeColor");
    this.text = attrs.text || attributes.get("text");
    this.fontSize = attrs.fontSize || attributes.get("fontSize");
    this.fontFamily = attrs.fontFamily || attributes.get("fontFamily");
    if (attrs.magnets) {
      this.magnets = _.map(attrs.magnets, function(m) {
        return new Magnet(m);
      });
    } else {
      this.magnets = _.times(5, function() {
        return new Magnet(attrs.point);
      });
    }

    var model = this;
    attributes.on("change:text", function() {
      if (model.selected) {
        model.text = attributes.get("text");
        diagram.redraw();
      }
    });
    attributes.on("change:strokeColor", function() {
      if (model.selected) {
        model.strokeColor = attributes.get("strokeColor");
        diagram.redraw();
      }
    });
    attributes.on("change:fontSize", function() {
      if (model.selected) {
        model.fontSize = attributes.get("fontSize");
        diagram.redraw();
      }
    });
    attributes.on("change:fontFamily", function() {
      if (model.selected) {
        model.fontFamily = attributes.get("fontFamily");
        diagram.redraw();
      }
    });
  },

  draw: function(context) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var p3 = this.magnets[3];
    var p4 = this.magnets[4];
    context.font = this.fontSize + "pt " + this.fontFamily;
    context.textBaseline = "top";
    context.fillStyle = this.strokeColor;
    context.fillText(this.text, p1.x, p1.y);
  },

  toJSON: function() {
    return {
      type: this.type,
      text: this.text,
      strokeColor: this.strokeColor,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      magnets: _.map(this.magnets, function(magnet) {
        return magnet.toJSON();
      })
    }
  }
});
