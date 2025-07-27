import app from './app';
import config from './config/config';
import { pool } from './db/pool.db';
import { Logging } from './utils/logger';

const logger = Logging.getInstance();
pool.getConnection()
    .then((conn) => conn.release())
    .catch((err) => logger.logError(`DB connection failed: ${err}`));

app.listen(config.port, () => {
    logger.logInfo(`Server running on port ${config.port}`);
});
