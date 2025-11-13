import { FastifyReply, FastifyRequest } from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import type { CustomJwtSessionClaims } from "@repo/types";

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
    return replay.status(401).send({ message: "You are not logged in" });
  }

  request.userId = userId;
};

export const shouldBeAdmin = async (
  request: FastifyRequest,
  replay: FastifyReply
) => {
  const auth = getAuth(request);
  if (!auth.userId) {
    return replay.status(401).send({ message: "You are not logged in" });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return replay.status(403).send({ message: "Unauthorized!" });
  }

  request.userId = auth.userId;
};
