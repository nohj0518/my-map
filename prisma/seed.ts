import { PrismaClient } from "@prisma/client";
import * as data from "../src/data/store_data.json";
const prisma = new PrismaClient();

async function seedData() {}
async function main() {
  await seedData();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
