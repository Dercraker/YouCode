import { requiredAuth } from '@/lib/auth/helper';
import { prisma } from '@/lib/prisma/prisma';
import { BarChart } from '@mantine/charts';
import { Paper, Stack, Title } from '@mantine/core';
import moment from 'moment';

const NewUserStats = async () => {
  const user = await requiredAuth();

  const newUsers = await prisma.courseOnUser.findMany({
    where: {
      course: {
        creatorId: user.id,
      },

      createdAt: {
        gte: moment().subtract(30, 'days').toDate(),
      },
    },
    select: {
      createdAt: true,
      canceledAt: true,
      id: true,
    },
  });

  const data = Array.from({ length: 30 }, (_, i) => {
    const date = moment().subtract(i, 'days').startOf('day').toDate();

    const newUsersCount = newUsers.filter(user => {
      const userDateWithoutTime = new Date(user.createdAt.setHours(0, 0, 0, 0));
      return userDateWithoutTime.getTime() === date.getTime();
    }).length;

    const canceledUsersCount = newUsers.filter(user => {
      if (!user.canceledAt) {
        return false;
      }
      const userDate = new Date(user.canceledAt);
      const userDateWithoutTime = new Date(userDate.setHours(0, 0, 0, 0));

      return userDateWithoutTime.getTime() === date.getTime();
    }).length;

    return {
      date: date.toDateString(),
      newUsersCount,
      canceledUsersCount,
    };
  }).reverse();

  return (
    <Paper shadow="xl" p="xl" withBorder>
      <Stack>
        <Title>Users course activity</Title>
        <BarChart
          h={300}
          data={data}
          dataKey="date"
          series={[
            { name: 'newUsersCount', color: 'blue.6' },
            { name: 'canceledUsersCount', color: 'red.6' },
          ]}
          tickLine="y"
        />
      </Stack>
    </Paper>
  );
};

export default NewUserStats;
