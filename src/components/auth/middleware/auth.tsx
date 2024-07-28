// // middleware/auth.js
// import { useUser } from '@clerk/nextjs';
// import { useGetUser } from '@src/utils/reactQuery';
// import { NextResponse } from 'next/server';

// export async function middleware(request) {
//   const token = request.cookies.get('token');
//   const url = request.nextUrl.clone();

//   if (!token) {
//     url.pathname = '/signIn';
//     return NextResponse.redirect(url);
//   }

//   try {
//     const { user } = useUser();
//     const { data: userResp } = useGetUser(user?.phoneNumbers[0]?.phoneNumber);

//     if (userResp?.data.role === 'admin') {
//       url.pathname = '/dashboard/default';
//     } else {
//       url.pathname = '/noAccess';
//     }
//   } catch (error) {
//     url.pathname = '/noAccess';
//   }

//   return NextResponse.redirect(url);
// }
