// import { Resend } from "resend";
// import { addSubscriber } from "./db";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function handleSignUp(email: string, name: string) {
//   try {
//     // Add to database
//     const added = await addSubscriber(name, email);
//     if (!added) {
//       throw new Error("Failed to add subscriber");
//     }

//     // Send welcome email
//     await resend.emails.send({
//       from: `${process.env.APP_NAME} <${process.env.EMAIL_FROM}>`,
//       to: email,
//       subject: `Welcome to ${process.env.APP_NAME}!`,
//       html: `
//         <!DOCTYPE html>
//         <html>
//           <body style="font-family: sans-serif; padding: 20px;">
//             <h1>Welcome ${name}! 👋</h1>
//             <p>Thanks for signing up to our app!</p>
//             <p>Stay tuned for updates about our launch.</p>
//           </body>
//         </html>
//       `,
//     });

//     // Notify admin
//     await resend.emails.send({
//       from: process.env.EMAIL_FROM!,
//       to: process.env.ADMIN_EMAIL!,
//       subject: "New Sign Up!",
//       html: `New user signed up:<br>Name: ${name}<br>Email: ${email}`,
//     });

//     return { success: true, message: "Successfully signed up!" };
//   } catch (error) {
//     console.error("Sign up error:", error);
//     return {
//       success: false,
//       message:
//         process.env.NODE_ENV === "development"
//           ? `Error: ${error.message}`
//           : "Error signing up. Please try again.",
//     };
//   }
// }
