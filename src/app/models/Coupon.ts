import { Category } from "./Category";

export class Coupon{

    public constructor(public id?: number, public companyId?: number, public category?: Category, public title?: string, public decription?: string, public startDate?: Date, public endDate?: Date, public amount?: number, public price?: number, public image?: string){}
}