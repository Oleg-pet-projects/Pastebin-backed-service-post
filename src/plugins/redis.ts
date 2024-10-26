import 'dotenv/config';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import fastifyRedis from '@fastify/redis';

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyRedis, {
    host: String(process.env.REDIS_HOST),
    port: Number(process.env.REDIS_PORT)
  });
});
