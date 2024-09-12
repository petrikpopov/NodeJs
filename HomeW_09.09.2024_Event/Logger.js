import EventEmitter from "node:events";

const emitter = new EventEmitter();

class Logger{
    
    logInfo (message) {
        emitter.emit("info", message);
    }

    logError (message) {
        emitter.emit("error", message);
    }

    logWarning (message) {
        emitter.emit("warning", message);
    }
}

const logger = new Logger();

emitter.on("info", (message) => {
    console.log(`Info: ${message}`)
})
emitter.on("error", (message) => {
    console.log(`Error: ${message}`)
})
emitter.on("warning", (message) => {
    console.log(`Warning: ${message}`)
})

logger.logInfo("This is an informational message.");
logger.logError("This is an error message.");
logger.logWarning("This is a warning message.");
