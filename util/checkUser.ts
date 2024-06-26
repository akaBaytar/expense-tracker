import { currentUser } from '@clerk/nextjs/server';

import { database } from '@/lib/database';

export const checkUser = async () => {
  const user = await currentUser();

  // check current logged in user (clerk)
  if (!user) return null;
  // check if the user is already in database
  const loggedInUser = await database.user.findUnique({
    where: { clerkUserId: user.id },
  });
  // if user in database return user
  if (loggedInUser) return loggedInUser;
  // if user not in database, create a new user
  const newUser = await database.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
