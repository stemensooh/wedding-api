
import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        JWT: {
            SECRET: process.env.JWT_SECRET,
            EXPIRES_IN: process.env.JWT_EXPIRES_IN,
        },
        MONGODB_URI: process.env.MONGODB_URI,
        GOOGLE_RECAPTCHA: {
            SECRET_KEY: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
        }
    };
});