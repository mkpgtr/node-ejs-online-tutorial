import pg from 'pg'

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    
    password: "secret",
    port: 5432,
  });

export default db

