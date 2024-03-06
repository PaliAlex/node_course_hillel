import fs from "fs";
import moment from "moment";
import {Readable} from "stream";
import FilenameTransformer from "../transformer.js";
import {getFileName} from "../helpers/getFileName.js";
import {messageFormat} from "../constants.js";
import csvWriter from 'csv-write-stream';

export class LoggerStream {
    fileLogStream(appenderValues) {
        const {format, level, date} = appenderValues;

        return format === messageFormat.CSV
            ? this._logCSV(date)
            : this._logFile(level, format)
    }

    consoleLogStream() {
        const readable = new Readable({
            read(size) {},
            encoding: 'utf8',
        });

        const transform =  readable.pipe(new FilenameTransformer());

        transform.pipe(process.stdout);

        return readable;
    }

    _logCSV(date) {
        const fileName = `${moment(date).format('DD_MM_YYYY')}.csv`;

        const writer = csvWriter({sendHeaders: false});
        const fileStream = fs.createWriteStream(fileName, {flags: 'a'});

        writer.pipe(fileStream);

        return writer;
    }

    _logFile(level, format) {
        const readable = new Readable({
            read(size) {},
            encoding: 'utf8',
        });

        const transform =  readable.pipe(new FilenameTransformer());

        const writeStream = fs.createWriteStream(getFileName(level, format), {flags: 'a+'});
        transform.pipe(writeStream);

        return readable;
    }
}