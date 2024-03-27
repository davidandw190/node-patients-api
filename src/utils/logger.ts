import pino, { LoggerOptions } from "pino";


/**
 * Interface representing the configuration options for the logger.
 */
interface LoggerConfig {
	base?: Record<string, any>;
	transport?: {
		target: string;
		options?: Record<string, any>;
	};

	timestamp?: () => string;
}

/**
 * Default logger configuration.
 */
const defaultLoggerConfig: LoggerConfig = {
	base: { pid: false },
	transport: {
		target: 'pino-pretty',
		options: {
			colorized: true
		}
	},
	
	timestamp: () => `,"time": "${new Date().toLocaleString()}"`,
}

/**
 * Func to create a logger instance with custom configuration.
 * @param config Logger configuration options.
 * @returns A new logger instance.
 */
function createLogger(config: LoggerConfig = defaultLoggerConfig): pino.Logger {
	const loggerOptions: LoggerOptions = {
		base: config.base || {},
		transport: {
			target: config.transport?.target || defaultLoggerConfig.transport!.target,
			options: config.transport?.options || defaultLoggerConfig.transport!.options,
		},
		timestamp: config.timestamp || defaultLoggerConfig.timestamp,
	}

	return pino(loggerOptions);
}

export default createLogger;


