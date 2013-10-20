
var Diagrams = Parse.Collection.extend({
  model: SavedDiagram,

  query: (function() {
    var query = new Parse.Query(SavedDiagram);
    query.descending("createdAt");
    return query;
  }())
});

var diagrams = new Diagrams();
$(function() {
  diagrams.fetch();
});

