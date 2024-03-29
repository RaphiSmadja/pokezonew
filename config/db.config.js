module.exports = {
    HOST: "localhost",
    USER: "admin",
    PASSWORD: "admin",
    DB: "pokezone",   
    dialect: "postgres",
    port: 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}