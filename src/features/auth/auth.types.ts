export interface RegistrationPayload extends LoginPayload {
    firstName: string;
    lastName: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}