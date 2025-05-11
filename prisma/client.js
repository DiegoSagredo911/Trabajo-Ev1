const { PrismaClient } = require("../src/generated/prisma/client");

const db = new PrismaClient();

module.exports = { db };
