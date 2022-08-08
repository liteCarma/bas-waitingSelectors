<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Waiting for multiple selectors at once</div>  
    <div class="tr tooltip-paragraph-fold">All standard BAS selectors are supported such as >XPATH>, >CSS>, >MATCH></div>
    <div class="tr tooltip-paragraph-fold">Additionally, a selector for image search is supported</div>
    <div class="tr tooltip-paragraph-fold">>img:threshold:scroll(noscroll)> base64</div>
    <div class="tr tooltip-paragraph-fold">example: >img:70:no scroll> iVBORw0KGgoAAAANS...</div>
    <div class="tr tooltip-paragraph-fold">The search will be stopped after finding any of the selectors</div>
    <div class="tr tooltip-paragraph-last-fold">In the variable that contains all the results, there is additional information such as whether there was a timeout, the search time, the selector found</div>
</div>
<div class="container-fluid flex">
  <%= _.template($('#input_constructor').html())({id:"timeout", description:"timeout", default_selector: "int", disable_string:true, value_number: 60, min_number:1, max_number:999999, help: {description: "sec"} }) %>
  <%= _.template($('#variable_constructor').html())({id:"allResults", description:tr(""), default_variable: "WAITING_RESULTS", help: {description: tr("This variable will contain object with result")}}) %>
  <% for (i = 1; i <= 20; i++) { %>
    <% var id = "sel" + i %>
    <% var visibleCheckBoxId = 'sel' + i + 'Visible' %>
    <div class="flex">
      <div>
      <%= _.template($('#variable_constructor').html())({id: id + "Save", description:tr(""), default_variable: "", help: {description: tr("Variable to save")}}) %>
      </div>
      <div>
      <%= _.template($('#input_constructor').html())({id: id, description:"sel " + i, default_selector: "string", disable_int:true, value_string: "", help: {description: ">CSS> ... or >XPATH> ... or >MATCH> ..."} }) %>
      </div>
      <div>
        <span data-preserve="true" data-preserve-type="check" data-preserve-id="<%= visibleCheckBoxId %>">
          <input type="checkbox" id="<%= visibleCheckBoxId %>" checked="checked"/>
          <label for="<%= visibleCheckBoxId %>" class="tr">Visible</label>
        </span>
     </div>
    </div>
  <% } %>
</div>

<style>
  .container-fluid {
    padding-right: 5px !important;
    padding-left: 5px !important;
  }
  .col-xs-12 {
    padding-right: 10px !important;
    padding-left: 10px !important;
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .flex>div:nth-child(1) {
    flex: 0 1 15em;
  }
  .flex>div:nth-child(2) {
    flex-grow: 1;
  }
</style>