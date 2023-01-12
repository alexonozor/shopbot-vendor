export interface User {
    _id:string;
    photo: string;
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    language: string;
    country: string;
    deleteAccount: boolean;
    address: string;
    password: string;
    phoneToken: string;
    loginCount: number;
    verifyPhoneNumber: boolean;
    allowNotifications:boolean;
    allowSalesNotifications: boolean;
    registered: string;
    notes: string;
    totalAmountSpent: number;
    avgAmountSpent: number;
    totalOrders: number;
    shipping: Shipping;
    
}

export interface Shipping {
     name: string;
    latitude: number;
    longitude: number;
    country: string;
    isoCountryCode: string;
    locality: string;
    postalCode: String;
    administrativeArea: string;
    subAdministrativeArea: String;
    subLocality: string;
    subThoroughfare: string;
    thoroughfare: string;
}
