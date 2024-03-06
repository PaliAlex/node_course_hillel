import {level as levelConstant} from "../constants.js";

export function getFileName(level, format) {
    return level === levelConstant.ERROR
        ? `error_${format.toLowerCase()}.log`
        : `app_${format.toLowerCase()}.log`
}