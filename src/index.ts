import 'dotenv/config';
import Fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import { join } from 'path';
import { loggerConfig } from './configs/logger';
import { version, name } from '../package.json';
import { formatVersionProject, formatNameProject } from './utils/format';

const fastify = Fastify({
  logger: loggerConfig['development']
});

fastify.register(autoLoad, {
  dir: join(__dirname, 'plugins'),
  dirNameRoutePrefix: false
});

fastify.register(autoLoad, {
  dir: join(__dirname, 'routes'),
  options: { prefix: `/api/${formatVersionProject(version)}` }
});

fastify.setErrorHandler((error, _, reply) => {
  fastify.log.error(error);
  reply.status(500).send({ error: 'Internal Server Error' });
});

fastify.get('/', (_, reply) => {
  reply.status(200).send({ message: `Welcome to ${formatNameProject(name)} API` });
});

const start = async () => {
  try {
    if (require.main === module) {
      await fastify.listen({
        port: Number(process.env.APP_PORT),
        host: String(process.env.APP_HOST)
      });
    }
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
