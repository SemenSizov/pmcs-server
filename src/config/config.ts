import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    dbHost: string;
    dbPort: number;
    dbUser: string;
    dbPass: string;
    dbName: string;
    jwtSecret: string;
    googleClientId: string;
    googleClientSecret: string;
    frontendUrl: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: Number(process.env.DB_PORT) || 3306,
    dbUser: process.env.DB_USER || 'user',
    dbPass: process.env.DB_PASS || '',
    dbName: process.env.DB_NAME || 'pmcs',
    jwtSecret: process.env.JWT_SECRET || 'default_secret',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

export default config;
