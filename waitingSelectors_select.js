function ValidateSelector(sel) {
  var valid =
    /(?:(?:\[\[[\S]+\]\])|(?:^$|\s*>MATCH>|^\s*>CSS>|^\s*>XPATH>|^\s*>img:\d+:(?:scroll|no scroll)>))/.test(
      sel.replace(/['"]+/g, '')
    );
  if (!valid) {
    Invalid(tr('not valid selector: ') + sel);
  }
  return valid;
}

var timeout = GetInputConstructorValue('timeout', loader);
if (timeout['original'].length <= 0) {
  Invalid(tr('timeout') + ' ' + tr('is empty'));
  return;
}

var codeVariables = {
  timeout: timeout['updated'],
  allResults: this.$el.find('#allResults').val().toUpperCase(),
};

var selectors = {};
var countInputs = document.querySelectorAll(
  '.input_selector_string[id^="sel"]'
).length;
for (i = 1; i <= countInputs; i++) {
  var id = 'sel' + i;
  var sel = GetInputConstructorValue(id, loader);
  var isValid = ValidateSelector(sel['original']);
  if (!isValid) {
    return;
  }
  selectors[id] = {
    sel: sel['updated'],
    visible: $('#' + id + 'Visible').is(':checked'),
    saveVariable: this.$el
      .find('#' + id + 'Save')
      .val()
      .toUpperCase(),
  };
}

codeVariables.selectors = JSON.stringify(selectors);
try {
  var code =
    loader.GetAdditionalData() +
    _.template($('#waitingSelectors_code').html())(codeVariables);
  code = Normalize(code, 0);
  BrowserAutomationStudio_Append(
    '',
    BrowserAutomationStudio_SaveControls() + code,
    action,
    DisableIfAdd
  );
} catch (e) {
  console.log(e);
}
