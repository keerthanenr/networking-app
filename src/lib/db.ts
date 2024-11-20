// import { sql } from "@vercel/postgres";

// export type Subscriber = {
//   id: string;
//   name: string;
//   email: string;
//   createdAt: Date;
//   status: "active" | "unsubscribed";
// };

// export async function addSubscriber(
//   name: string,
//   email: string
// ): Promise<boolean> {
//   try {
//     await sql`
//       INSERT INTO subscribers (name, email, status, created_at)
//       VALUES (${name}, ${email}, 'active', NOW())
//     `;
//     return true;
//   } catch (error) {
//     console.error("Error adding subscriber:", error);
//     return false;
//   }
// }

// export async function getSubscribers(): Promise<Subscriber[]> {
//   try {
//     const { rows } = await sql`
//       SELECT * FROM subscribers 
//       WHERE status = 'active' 
//       ORDER BY created_at DESC
//     `;
//     return rows;
//   } catch (error) {
//     console.error("Error getting subscribers:", error);
//     return [];
//   }
// }
