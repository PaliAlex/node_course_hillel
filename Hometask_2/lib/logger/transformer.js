import {Transform} from "stream";
import {formatMessage} from "./helpers/formatMessage.js";

export default class FilenameTransformer extends Transform {
    _transform(chunk, encoding, callback) {
        const message = formatMessage(chunk);
        callback(null, message);
    }
}

