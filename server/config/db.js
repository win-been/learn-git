module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "123456",
    DB: process.env.DB_NAME || "deliverydb",
    dialect: "mysql",
}