import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  console.log("Limpando tabelas...");

  await prisma.rating.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.place.deleteMany();
  await prisma.user.deleteMany();

  console.log("Criando usuários...");
  const senhaHash = await bcrypt.hash("senha123", await bcrypt.genSalt());

  const users = await prisma.$transaction([
    prisma.user.create({
      data: {
        name: "Ana Souza",
        email: "ana@example.com",
        password: senhaHash,
      }
    }),
    prisma.user.create({
      data: {
        name: "Pedro Lima",
        email: "pedro@example.com",
        password: senhaHash,
      }
    }),
    prisma.user.create({
      data: {
        name: "Carla Mendes",
        email: "carla@example.com",
        password: senhaHash,
        role: "admin"
      }
    }),
  ]);

  console.log("Criando lugares...");
  const places = await prisma.$transaction([
    prisma.place.create({
      data: {
        name: "Parque Central",
        description: "Parque público com área verde.",
        location: "Centro"
      }
    }),
    prisma.place.create({
      data: {
        name: "Biblioteca Municipal",
        description: "Espaço silencioso para leitura.",
        location: "Bairro Sul"
      }
    }),
    prisma.place.create({
      data: {
        name: "Quadra Poliesportiva",
        description: "Quadra aberta ao público.",
        location: "Zona Leste"
      }
    }),
  ]);

  console.log("Criando disponibilidades...");
  for (const place of places) {
    await prisma.availability.createMany({
      data: [
        {
          placeId: place.id,
          date: new Date(),
          isOpen: true,
          notes: "Aberto normal"
        },
        {
          placeId: place.id,
          date: new Date(Date.now() + 86400000),
          isOpen: false,
          notes: "Fechado para manutenção"
        }
      ]
    });
  }

  console.log("Criando comentários...");
  for (const data of [
    { userId: users[0].id, placeId: places[0].id, content: "Lugar muito agradável!" },
    { userId: users[1].id, placeId: places[1].id, content: "Ambiente bem tranquilo." },
    { userId: users[2].id, placeId: places[2].id, content: "Ótimo para praticar esportes." },
  ]) {
    await prisma.comment.create({ data });
  }

  console.log("Criando avaliações...");
  for (const data of [
    { userId: users[0].id, placeId: places[0].id, score: 5 },
    { userId: users[1].id, placeId: places[1].id, score: 4 },
    { userId: users[2].id, placeId: places[2].id, score: 5 },
  ]) {
    await prisma.rating.create({ data });
  }


  console.log("Seed finalizado!");
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
