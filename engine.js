function waitingSelectors(){
  _selectors = _function_argument("selectors")
  _timeout = _function_argument("timeout") * 1000

  _resultSel = {}
  for (key in _selectors) {
    var val = _selectors[key]
    val.sel = eval(val.sel)
  }
  _selKeys = Object.keys(_selectors)
    .filter(function(key) {
      return _selectors[key].sel && _selectors[key].sel.trim()
    })

  _index = 0
  _startTime = Date.now()
  _do(function(){
    if (_selKeys.length === 0) {
      _break('function')
    }
    _key = _selKeys[_index]
    var isImgSel = /^\s*>img:\d+:(?:scroll|no scroll)>/.test(_selectors[_key].sel)
    _call(function(){
      _on_fail(function(){
        _break(1,true)
      })

      _if_else(isImgSel, function() {
        var val = _selectors[_key]
        var selData = val.sel.match(/([^:]+):([^:]+)>\s+(\S+)/)
        var data = {fail: false, wait: false};
        data["scroll"] = "scroll" == selData[2];
        data["threshold"] = parseInt(selData[1]);
        data["timeout"] = 60000;
        data["data"] = selData[3]
        _wait_image(data)!
        _image().exist()!
        _resultSel[_key] = _result() == 1
      }, function() {
        var val = _selectors[_key]
        get_element_selector(val.sel, false).nowait().script2("let exist = self !== null;\r\nif (" + val.visible + " && exist) {\r\n    const box = self.getBoundingClientRect();\r\n    const doc = document.documentElement;\r\n exist  =  document.readyState != 'loading' && box.width > 10 && box.height > 10 && box.top + box.height >= 0 && box.left + box.width >= 0 && box.right <= doc.scrollWidth && box.bottom <= doc.scrollHeight;\r\n};[\[_IS_EXIST]\]=exist",_read_variables(["VAR__IS_EXIST"]))!
        var variables = JSON.parse(_result()).variables
        _resultSel[_key] = JSON.parse(variables)['_IS_EXIST']
      })!
    },null)!

    var timeWork = Date.now() - _startTime
    _resultSel.timeout = timeWork >= _timeout
    _resultSel.time = timeWork

    var isExist = _resultSel[_key]
    if (isExist) {
      _resultSel.foundSel = _selectors[_key].sel
    }

    if (isExist || _resultSel.timeout) {
      _break('function')
    }

    _if (++_index >= _selKeys.length, function() {
      sleep(1000)!
      _index = 0
    })!
  })!

  _function_return(_resultSel)
}

