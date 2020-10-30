export declare class Utils {
    MAX_TOKEN_TIME: number;
    multer: any;
    static generateVerificationToken(size?: number): number;
    static encryptPassword(password: string): Promise<any>;
    static comparePassword(password: {
        plainPassword: string;
        encryptedPassword: string;
    }): Promise<any>;
}
