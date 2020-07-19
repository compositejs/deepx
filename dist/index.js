"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent = void 0;
var Hje = require("hje");
var DataSense = require("datasense");
var component_1 = require("./component");
Object.defineProperty(exports, "BaseComponent", { enumerable: true, get: function () { return component_1.BaseComponent; } });
function init() {
    Hje.InternalInjectionPool.hittask(DataSense.HitTask);
}
init();
//# sourceMappingURL=index.js.map