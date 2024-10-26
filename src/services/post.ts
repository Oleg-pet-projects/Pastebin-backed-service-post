import 'dotenv/config';
import { FastifyInstance } from 'fastify';
import { Posts } from '@prisma/client';
import {
  createPostRepository,
  getAllPostsRepository,
  postByIdRepository,
  updatePostRepository,
  deletePostRepository
} from '../repositories/post';

export const createPostService = async (
  fastify: FastifyInstance,
  data: Omit<Posts, 'id'>
): Promise<Posts> => createPostRepository(fastify, data);

export const getAllPostsService = async (fastify: FastifyInstance): Promise<Posts[]> => {
  let posts;

  const cacheData = await fastify.redis.get('all-posts');

  if (cacheData) {
    posts = JSON.parse(cacheData);
  } else {
    posts = await getAllPostsRepository(fastify);
    fastify.redis.set('all-posts', JSON.stringify(posts), 'EX', Number(process.env.CACHE_STORAGE_TIME));
  }

  return posts;
};

export const postByIdService = async (fastify: FastifyInstance, id: string): Promise<Posts> =>
  postByIdRepository(fastify, id);

export const updatePostService = async (
  fastify: FastifyInstance,
  id: string,
  data: Omit<Posts, 'id'>
): Promise<Posts> => updatePostRepository(fastify, id, data);

export const deletePostService = async (fastify: FastifyInstance, id: string): Promise<Posts> =>
  deletePostRepository(fastify, id);

export default {
  createPostService,
  getAllPostsService,
  postByIdService,
  updatePostService,
  deletePostService
};
