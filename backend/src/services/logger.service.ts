import pino from "pino";
import pinoPretty from "pino-pretty";

// Create a Pino logger instance for the file output (JSON format)
const fileStream = pino.destination('./logs/app.log');

// Create a Pino Pretty stream for simple, human-readable console output
const prettyStream = pinoPretty({
  colorize: true,
  translateTime: 'SYS:standard',
  ignore: 'pid,hostname',
  singleLine: true
});

// Create the Pino logger
const logger = pino(
  {
    level: 'info',
  },
  pino.multistream([
    { stream: prettyStream }, // Console output
    { stream: fileStream },   // File output
  ])
);

export default logger;
