"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var nevt = new index_1["default"]();
var EAction;
(function (EAction) {
    EAction["LAZY"] = "LAZY";
})(EAction || (EAction = {}));
// pub 
nevt.emit(EAction.LAZY, { name: 'LAZY' }, { lazy: true });
// sub after pub
nevt.on(EAction.LAZY, function (data) {
    console.log(data.name);
}, { lazy: true });
