import { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Dans la function `main`, je fais un code pour créer 10 utilisateurs qui ont chacun 1 cours et 100 relations entre les cours et les utilisateurs en tant qu'élèves.

const main = async () => {
  const users: any[] = [];

  for (let i = 0; i < 10; i++) {
    users.push(
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          createdCourses: {
            create: {
              name: faker.lorem.words(3),
              createdAt: faker.date.past(),
              presentation: faker.lorem.paragraph(),
              image: faker.image.url(),
              lessons: {
                createMany: {
                  data: [
                    {
                      name: faker.lorem.words(3),
                      content: faker.lorem.paragraph(),
                      rank: 'aaaaaa',
                    },
                    {
                      name: faker.lorem.words(3),
                      content: faker.lorem.paragraph(),
                      rank: 'aaaaab',
                    },
                  ],
                },
              },
            },
          },
        },
      }),
    );
  }

  // link users to courses
  const courses = await prisma.course.findMany();

  for (const course of courses) {
    const random3Users = faker.helpers.arrayElements(users, 3);

    if (course.id === 'clvob28ef00018i2xui49i65e')
      for (const user of users) {
        const courseOnUser = await prisma.courseOnUser.findFirst({
          where: {
            userId: user.id,
            courseId: course.id,
          },
        });

        if (!courseOnUser)
          await prisma.courseOnUser.create({
            data: {
              userId: user.id,
              courseId: course.id,
            },
          });
      }

    for (const user of random3Users) {
      await prisma.courseOnUser.create({
        data: {
          userId: user.id,
          courseId: course.id,
        },
      });
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async error => {
    // eslint-disable-next-line no-console
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
