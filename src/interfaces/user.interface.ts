export interface User {
    id: string;
    name: string;
    email: string;
    role:string;
    image: string | null;
    emailVerified: Date | null
}