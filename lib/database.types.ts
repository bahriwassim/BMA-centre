export type ReservationStatus='pending'|'confirmed'|'cancelled'|'completed';
export type Room={id:string;name:string;description:string|null;capacity:number;daily_price:number|null;weekly_price:number|null;monthly_price:number|null;image:string|null};
export type Reservation={id:string;first_name:string;last_name:string;email:string;phone:string;whatsapp:string|null;room_id:string;reservation_date:string;status:ReservationStatus;notes:string|null;created_at:string};
