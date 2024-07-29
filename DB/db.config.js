import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});

export default prisma;
