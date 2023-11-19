// 'use server';

// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
// import prisma from '@/app/libs/prismadb';
// import bcrypt from 'bcrypt';

// export async function formAction(formData: FormData) {
//   const email = formData.get('email') as string;
//   const password = formData.get('password') as string;
//   const hashedPassword = await bcrypt.hash(password, 12);

//   // validation

//   // store to database
//   try {
//     if (formData.get('variant') === 'REGISTER') {
//       const name = formData.get('name') as string;
//       await prisma.user.create({
//         data: {
//           email,
//           name,
//           hashedPassword,
//         },
//       });
//     }
//   } catch {
//     return { message: 'error' };
//   }

//   revalidatePath('/dashboard/signIn');
//   redirect('/dashboard');
// }
