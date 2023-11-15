'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function formAction(formData: FormData) {
  console.log(formData.get('email'));
  // validation
  // store to database -> prisma

  revalidatePath('/dashboard');
  redirect('/dashboard');
}
