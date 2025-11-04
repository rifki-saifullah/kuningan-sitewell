export type LoginPayload = {
    email: string;
    password: string;
}

export type SessionResource = {
    token: string;
    type: string;
    expires_in: number;
}