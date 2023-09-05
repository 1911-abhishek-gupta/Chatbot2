const Pool =  require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"Flash19112002",
    host:"localhost",
    port:5432,
    database:"chatbot"
});

module.exports = pool;