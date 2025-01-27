declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test"; // Optional environment
        PORT: number;
        HOST: string;
        DATABASE_URL: string;
        MAIL_USER: string;
        MAIL_PASS: string;
        JWT_SECRET: string;
    }
}
