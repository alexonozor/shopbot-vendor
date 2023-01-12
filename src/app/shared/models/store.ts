import { Menu } from "./menu";


export interface Store {
  _id: string;
  bannerImage?: string;
  logo: string;
  name: string;
  description: string;
  active?: boolean;
  contactInfo: ContactInfo;
  notifications?: Notifications;
  operations?: Operations;
  orderSettings: OrderSettings;
  deliveryService: DeliveryService;
  paused: boolean;
  businessHours: BusinessHours | any;
  rank?: number;
  location?: Location;
  owner?: string,
  menus: Menu[],
  currency: string;
  deliverySettings: DeliverySettings
};

interface DeliverySettings {
  deliveryRadius: string;
  deliveryFeeNumber: number;
  deliveryFee: number;
  minimumOrderAmountForFreeDelivery: number;
  deliveryFeeForAllOrder: number;
  minimumDeliveryFee: number;
  deliveryFeeByKilometers: number;
  allowMinimumOrderAmount: number;
  minimumOrderAmount: number;
  estimatedDeliveryTime: {
     minimum: string;
     maximum: string;
  };
  enableDeliveryInstructions: boolean;
  deliveryInstructions: string;
}


interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  placeName: string;
  placeNumber: string;
}


interface Notifications {
  sms: string;
  phone: string;
  email: string;
}

interface Operations {
  payToBank: boolean;
  enableDelivery: boolean;
  alowPickUp: boolean;
}


interface OrderSettings {
  OrderPrepTime: string;
  enablePickup: string;
  allowMinimumOrderAmount: boolean;
  minimumOrderAmount: number;
  pickUpInstruction: string;
}

interface DeliveryService {
  deliverOrderToCustomers: 'My own couriers' | 'Our Courier';
}

interface BusinessHours {
  friday: { openingTime: string, closingTime: string, referenceDate: string };
  monday: { openingTime: string, closingTime: string, referenceDate: string };
  saturday: { openingTime: string, closingTime: string, referenceDate: string };
  sunday: { openingTime: string, closingTime: string, referenceDate: string };
  thursday: { openingTime: string, closingTime: string, referenceDate: string };
  tuesday: { openingTime: string, closingTime: string, referenceDate: string };
  wednesday: { openingTime: string, closingTime: string, referenceDate: string };
}


interface Location {
  type: 'Point'
  coordinates: number[];
}




