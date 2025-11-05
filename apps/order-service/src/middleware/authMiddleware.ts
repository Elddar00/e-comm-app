import { FastifyReply, FastifyRequest } from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  const { userId } = getAuth(request);
  if (!userId) {
    return replay.send({ message: "You are not logged in" });
  }

  request.userId = userId;
};
