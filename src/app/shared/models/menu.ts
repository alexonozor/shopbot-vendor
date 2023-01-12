import { Product } from './product';

export interface Menu {
    _id:string;
    name: string;
    description: string;
    activate: boolean;
    daysActive: any;
    store: string;
    foods: Product[],
}


export interface DaysActive {
    sunday: { active: boolean; time: { from: string; to: string; } };
    monday: { active: boolean; time: { from: string; to: string; } };
    tuesday: { active: boolean; time: { from: string; to: string; } };
    wednesday: { active: boolean; time: { from: string; to: string; } };
    thursday: { active: boolean; time: { from: string; to: string; } };
    friday: { active: boolean; time: { from: string; to: string; } };
    saturday: { active: boolean; time: { from: string; to: string; } }; 
}