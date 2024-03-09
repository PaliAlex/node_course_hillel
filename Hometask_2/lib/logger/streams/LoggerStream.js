import fs from "fs";
import {Readable} from "stream";
import FilenameTransformer from "../transformer.js";
import {getFileName} from "../helpers/getFileName.js";
import {appender as appenderConstant} from "../constants.js";

export class LoggerStream {
    fileLogStream(appenderValues, appender) {
        const {level, date} = appenderValues;

        const readable = new Readable({
            read(size) {},
            encoding: 'utf8',
        });

        const transform =  readable.pipe(new FilenameTransformer());

        this._pipeTransform(level, date, transform, appender)

        return readable;
    }

    _pipeTransform(level, date, transform, appender) {
        if(appender === appenderConstant.CONSOLE) {
            transform.pipe(process.stdout);

            return;
        }

        const writeStream = fs.createWriteStream(getFileName(level, date), {flags: 'a+'});
        transform.pipe(writeStream);
    }
}