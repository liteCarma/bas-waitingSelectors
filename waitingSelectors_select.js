function ValidateSelector(sel) {
  var valid = /^$|\s*>MATCH>|^\s*>CSS>|^\s*>XPATH>|^\s*>img:\d+:(?:scroll|no scroll)>/i.test(sel.replace(/['"]+/g,''))
  if (!valid) {
    Invalid(tr("not valid selector: ") + sel);
  }
  return valid
}

var timeout = GetInputConstructorValue("timeout", loader);
if(timeout["original"].length <= 0){
	Invalid(tr("timeout") + " " + tr("is empty"));
    return;
};

var codeVariables = {
  timeout: timeout["updated"],
  "allResults": this.$el.find("#allResults").val().toUpperCase()
}

var selectors = {}
for (i = 1; i <= 20; i++) {
  var id = 'sel' + i
  var sel = GetInputConstructorValue(id, loader)
  var isValid = ValidateSelector(sel["original"])
  if (!isValid) {
    return
  }
  selectors[id] = {
    sel: sel["updated"],
    visible: $('#' + id + 'Visible').is(':checked'),
    saveVariable: this.$el.find("#" + id + 'Save').val().toUpperCase()
  }
}

codeVariables.selectors = JSON.stringify(selectors)
try{
  var code = loader.GetAdditionalData() + _.template($("#waitingSelectors_code").html())(codeVariables);
  code = Normalize(code,0);
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e){
  console.log(e)
}
