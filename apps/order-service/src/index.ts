import Fastify from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, replay) => {
  return replay.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get("/test", (request, replay) => {
  const { userId } = getAuth(request);
  if (!userId) {
    return replay.send({ message: "You are not logged in" });
  }
  return replay.send({ message: "Order service is authenticated" });
});

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port 8001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
