import {level as levelConstant, messageFormat} from "../constants.js";
import config from "../config.js";
import moment from "moment";

export function getFileName(level, date) {
    if(config.format === messageFormat.CSV) {
        return `${moment(date).format('DD_MM_YYYY')}.csv`
    }

    return level === levelConstant.ERROR
        ? `error_${config.format.toLowerCase()}.log`
        : `app_${config.format.toLowerCase()}.log`
}