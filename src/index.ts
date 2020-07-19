import * as Hje from "hje";
import * as DataSense from "datasense";
import { BaseComponent } from "./component";

function init() {
    Hje.InternalInjectionPool.hittask(DataSense.HitTask);
}

init();

export { BaseComponent };
