import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// async function seedData() {
//   data?.["DATA"]?.map(async (store) => {
//     const storeData = {
//       phone: store?.tel_no,
//       address: store?.rdn_code_nm,
//       lat: store?.y_dnts,
//       lng: store?.x_cnts,
//       name: store?.upso_nm,
//       category: store?.bizcnd_code_nm,
//       storeType: store?.cob_code_nm,
//       foodCertifyName: store?.crtfc_gbn_nm,
//     };
//     const result = await prisma.store.create({
//       data: storeData,
//     });
//     console.log(result);
//   });
// }

async function main() {
  //await seedData();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
