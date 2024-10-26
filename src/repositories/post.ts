import { FastifyInstance } from 'fastify';
import { Posts } from '@prisma/client';

export const createPostRepository = async (
  fastify: FastifyInstance,
  data: Omit<Posts, 'id'>
): Promise<Posts> =>
  fastify.prisma.posts.create({
    data
  });

export const getAllPostsRepository = async (fastify: FastifyInstance): Promise<Posts[]> =>
  fastify.prisma.posts.findMany();

export const postByIdRepository = async (fastify: FastifyInstance, id: string): Promise<Posts> =>
  
  fastify.prisma.posts.findUnique({
    where: {
      id
    }
  });

export const updatePostRepository = async (
  fastify: FastifyInstance,
  id: string,
  data: Omit<Posts, 'id'>
): Promise<Posts> =>
  fastify.prisma.posts.update({
    where: { id },
    data
  });

export const deletePostRepository = async (fastify: FastifyInstance, id: string): Promise<Posts> =>
  fastify.prisma.posts.delete({ where: { id } });

export default {
  createPostRepository,
  getAllPostsRepository,
  postByIdRepository,
  updatePostRepository,
  deletePostRepository
};
