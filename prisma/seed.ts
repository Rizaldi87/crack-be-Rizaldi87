import {
  PrismaClient,
  Role,
  COURSESTATUS,
  ENROLLMENTSTATUS,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  /* ===================== USER ===================== */
  const password = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@mail.com',
      password,
      role: Role.ADMIN,
    },
  });

  const student = await prisma.user.create({
    data: {
      name: 'Student',
      email: 'student@mail.com',
      password,
      role: Role.USER,
    },
  });

  /* ===================== COURSE ===================== */
  const course = await prisma.course.create({
    data: {
      title: 'NestJS & Prisma Course',
      description: 'Belajar NestJS dengan Prisma',
      image: 'https://example.com/course.png',
      status: COURSESTATUS.PUBLISHED,
    },
  });

  /* ===================== LESSON ===================== */
  const lesson1 = await prisma.lesson.create({
    data: {
      courseId: course.id,
      title: 'Introduction',
      content: '<p>Intro Content</p>',
      order: 1,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      courseId: course.id,
      title: 'Prisma Basics',
      content: '<p>Prisma Content</p>',
      order: 2,
    },
  });

  /* ===================== QUIZ ===================== */
  const quiz = await prisma.quiz.create({
    data: {
      lessonId: lesson2.id,
      title: 'Prisma Quiz',
    },
  });

  /* ===================== QUESTION ===================== */
  const question = await prisma.question.create({
    data: {
      quizId: quiz.id,
      questionText: 'Apa itu Prisma?',
    },
  });

  /* ===================== CHOICES ===================== */
  const choiceA = await prisma.choice.create({
    data: {
      questionId: question.id,
      text: 'ORM untuk Node.js',
      isCorrect: true,
    },
  });

  const choiceB = await prisma.choice.create({
    data: {
      questionId: question.id,
      text: 'Framework Frontend',
      isCorrect: false,
    },
  });

  /* ===================== ENROLLMENT ===================== */
  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: course.id,
      status: ENROLLMENTSTATUS.ONGOING,
      progress: 50,
    },
  });

  /* ===================== LESSON PROGRESS ===================== */
  await prisma.lessonProgress.create({
    data: {
      userId: student.id,
      lessonId: lesson1.id,
      isCompleted: true,
      completedAt: new Date(),
    },
  });

  /* ===================== QUIZ ANSWER ===================== */
  await prisma.quizAnswer.create({
    data: {
      studentId: student.id,
      quizId: quiz.id,
      questionId: question.id,
      choiceId: choiceA.id,
      isCorrect: true,
    },
  });

  /* ===================== QUIZ RESULT ===================== */
  await prisma.quizResult.create({
    data: {
      studentId: student.id,
      quizId: quiz.id,
      score: 100,
    },
  });

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
