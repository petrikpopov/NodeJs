import path from "node:path";
import {log} from "node:console"

const __dirName = import.meta.dirname;
const __fileName = import.meta.filename;

log(path.sep);
log(path.join("users", "//logs", "!.logs.txt"));
// log(path.normalize("users", "//.logs", "!.logs.txt"))
log(path.parse(__fileName))
// log(path.extname(path.join(__dirname, "db.json")))
log(path.isAbsolute("user"+path.sep+"logs"));
log(path.isAbsolute(__dirName));
log(path.dirname(__fileName));
