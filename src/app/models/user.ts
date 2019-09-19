export class User {
    firstName: string;
    lastName: string;
    email: string;
    mobile:string;
    password:string;

    public constructor(init?: User) {
        Object.assign(this, init);
    }

}