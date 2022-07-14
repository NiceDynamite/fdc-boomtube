// const { Pool } = require("pg");

// const pool = new Pool({
//   // Format: postgres://user:password@host:5432/database
//     connectionString: process.env.DATABASE_URL,
//     ssl: {rejectUnauthorized: false}
// });

// module.exports = pool;

const { Pool } = require('pg')

const poolConfig = {
    connectionString: process.env.DATABASE_URL,
}

if (process.env.NODE_ENV === "production") {
    poolConfig.ssl = {rejectUnauthorized: false}
}

const pool = new Pool(poolConfig);

module.exports = pool;