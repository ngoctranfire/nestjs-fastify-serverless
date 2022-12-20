import { bootstrap } from './lambda';
import { FastifyInstance } from 'fastify';

async function startLocal() {
  const fastifyInstance: FastifyInstance = await bootstrap();
  fastifyInstance.listen({
    port: 3000,
    host: '127.0.0.1',
  });
}

startLocal();
