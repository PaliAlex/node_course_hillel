/**
 * Logger:
 *  log_level: info, warn, error, trace, debug
 *  log_score: {
 *      none: ??? 0
 *      error: 1
 *      warn: 2
 *      info: 3
 *      debug: 4
 *      trace: 5
 *  }
 *  appenders: console, file, queue, elastic...
 */

import logger from "./lib/logger/logger.js";

import color from "./color.js";
import fruit from "./fruit.js";

const data = {
    id: 123,
    value: 'someData'
};

const user = {
    id: 999,
    userName: 'Name Of User'
}
const log = logger.getLogger("app.js");

log.info("Data", data, "User:", user, "Sdf", "test");
log.info(color, fruit);
log.info(fruit);
// log.error("ERROR occur: My log");
//
// add(3,5);

