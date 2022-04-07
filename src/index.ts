import { load } from '@foodmoni.com/helper';
import 'dotenv/config';

(async () => {
  const serviceName = process.env.NODE_ENV === 'production' ? 'GENERAL_PROD_DB' : 'GENERAL_DEV_DB';
  const privateKey = process.env._PRIVATE_KEY?.replace(/\\n/g, '\n');
  await load({
    projectId: 'foodmoni1',
    serviceName,
    credentials: { client_email: process.env._CLIENT_EMAIL || '', private_key: privateKey || '' },
  });
  require('./app');
})();
