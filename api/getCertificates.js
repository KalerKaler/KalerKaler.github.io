import { neon } from "@neondatabase/serverless";

export default async function handler(req, res){
    try {
    const sql = neon(import.meta.env.VITE_DATABASE_URL);
    const rows = await sql`SELECT NOW() AS time`;
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}