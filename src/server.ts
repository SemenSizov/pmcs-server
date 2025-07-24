import app from './app';
import config from './config/config';
import { Logging } from './utils/logger';

const logger = Logging.getInstance()

app.listen(config.port, () => {
  logger.logInfo(`Server running on port ${config.port}`);
});