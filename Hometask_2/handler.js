import logger from "./lib/logger/logger.js";
import {messageFormat} from "./lib/logger/constants.js";

const log = logger.getLogger("handler.js", messageFormat.JSON);
function add(a, b) {
    log.info("First operand " + a);
    log.info("Second operand " + b);
    return a + b;
}

export {add}
