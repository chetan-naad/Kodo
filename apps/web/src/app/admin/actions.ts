'use server';

import { prisma } from '@kodo/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

function checkAdmin() {
  const { userId } = auth();
  if (!userId) throw new Error('Unauthorized');
  const adminIds = (process.env.ADMIN_USER_IDS || '').split(',');
  if (!adminIds.includes(userId)) throw new Error('Forbidden');
  return userId;
}

export async function createStage(data: FormData) {
  checkAdmin();
  const title = data.get('title') as string;
  const description = data.get('description') as string;
  const order = parseInt(data.get('order') as string, 10);

  await prisma.stage.create({
    data: {
      title,
      description,
      order,
      published: false
    }
  });

  revalidatePath('/admin/stages');
}
