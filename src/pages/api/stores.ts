// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StoreApiResponse, StoreType } from "@/interface";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResponse | StoreType[]>
) {
  const { page = "" }: { page?: string } = req.query;
  const prisma = new PrismaClient();
  if (page) {
    const skipPage = (Number(page) - 1) * 10;
    const totalCount = await prisma.store.count();
    const stores = await prisma.store.findMany({
      orderBy: {
        id: "asc",
      },
      skip: skipPage,
      take: 10,
    });
    res.status(200).json({
      page: Number(page),
      data: stores,
      totalCount,
      totalPages: Math.ceil(totalCount / 10),
    });
  } else {
    const stores = await prisma.store.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return res.status(200).json(stores);
  }
}
