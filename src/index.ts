import Hje from "hje";
import DataSense from "datasense";
import { BaseComponent } from "./component";

function init() {
    Hje.InternalInjectionPool.hittask(DataSense.HitTask);
}

init();

export { BaseComponent };
