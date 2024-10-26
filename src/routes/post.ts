import { FastifyInstance } from 'fastify';
import { Posts } from '@prisma/client';

import {
  createPostService,
  getAllPostsService,
  postByIdService,
  updatePostService,
  deletePostService
} from '../services/post';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: Omit<Posts, 'id'> }>('/post', async (request, reply) => {
    const data = request.body;
    reply.code(200).send(await createPostService(fastify, data));
  });

  fastify.get('/posts', async (request, reply) => {
    reply.code(200).send(await getAllPostsService(fastify));
  });

  fastify.get<{
    Params: {
      id: string;
    };
  }>('/post/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(200).send(await postByIdService(fastify, id));
  });

  fastify.put<{
    Params: {
      id: string;
    };
    Body: Omit<Posts, 'id'>;
  }>('/post/:id', async (request, reply) => {
    const id = request.params.id;
    const data = request.body;
    reply.code(200).send(await updatePostService(fastify, id, data));
  });

  fastify.delete<{
    Params: {
      id: string;
    };
  }>('/post/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(200).send(await deletePostService(fastify, id));
  });
};
