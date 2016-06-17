// Credit to https://funkjedi.com/technology/412-every-nth-item-in-handlebars/

Handlebars.registerHelper('grouped_each', function(every, context, options) {
  var out = "",
    subcontext = [],
    i;
  if (context && context.length > 0) {
    for (i = 0; i < context.length; i++) {
      context[i].outer_index = i;
      if (i > 0 && i % every === 0) {
        out += options.fn(subcontext);
        subcontext = [];
      }
      subcontext.push(context[i]);
    }
    out += options.fn(subcontext);
  }
  return out;
});
