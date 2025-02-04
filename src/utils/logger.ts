import fs from "fs";
import path from "path";
import winston from "winston";


const logsDir = path.join(__dirname, "../../../logs"); 
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), 
    winston.format.printf(({ timestamp, level, message, status, body }) => {
      
      const bodyString = body && typeof body === 'object' ? JSON.stringify(body) : body;
      
      return `${timestamp} [${level.toUpperCase()}] ${message} ${status ? `Status: ${status}` : ''} ${bodyString ? `Body: ${bodyString}` : ''}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log"), 
    }),
  ],
});

export default logger;