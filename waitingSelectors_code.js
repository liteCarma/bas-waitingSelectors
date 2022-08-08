_call_function(waitingSelectors, { "selectors": (<%= selectors %>), "timeout": (<%= timeout %>)})!
(function() {
  var r = _result_function()

  <% if (allResults) {%>
    <%= 'VAR_' + allResults %> = r
  <% }%>

  <% selectors = JSON.parse(selectors) %>
  <% for (id in selectors) { %>
    <% if (selectors[id].saveVariable) {%>
      <%= 'VAR_' + selectors[id].saveVariable %> = r["<%= id %>"]
    <% }%>
  <% } %>
})()
