// import { PrismaClient } from '../generated/prisma';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.course.create({
    data: {
      title: 'Belajar Bahasa Inggris untuk Pemula',
      description:
        'Kursus bahasa Inggris dari dasar sampai percakapan sehari-hari',
      lessons: {
        create: [
          {
            title: 'Alphabet & Pronunciation',
            content:
              '<p>Mengenal alfabet dan cara pengucapan dalam bahasa Inggris</p>',
            order: 1,
          },
          {
            title: 'Basic Greetings',
            content: '<p>Salam dan perkenalan dasar dalam bahasa Inggris</p>',
            order: 2,
          },
          {
            title: 'Introducing Yourself',
            content: '<p>Cara memperkenalkan diri dengan benar</p>',
            order: 3,
          },
          {
            title: 'Numbers & Dates',
            content: '<p>Belajar angka, tanggal, dan waktu</p>',
            order: 4,
          },
          {
            title: 'Daily Activities',
            content: '<p>Kosakata kegiatan sehari-hari</p>',
            order: 5,
          },
          {
            title: 'Simple Present Tense',
            content: '<p>Struktur kalimat present tense</p>',
            order: 6,
          },
        ],
      },
    },
  });
  console.log('Seed data berhasil ditambahkan!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
