
export interface Merchant {
    _id:string;
    photo: string;
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    language: string;
    country: string;
    deactivate: boolean;
    address: string;
    password: string;
    phoneToken: string;
    loginCount: number;
    verifyPhoneNumber: boolean;
}


