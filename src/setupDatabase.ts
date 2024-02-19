import mongoose from 'mongoose';
import { config } from './config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase');
export default () => {
  const connect = () => {
    mongoose
      .connect(config.DATABASE_URL!)
      .then(() => {
        log.info('Successfully connected to database');
      })
      .catch((error) => {
        log.error('error connecting to db', error);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
