export class User {
    static fromFirebase({ email, nombre, uid }: { email: string | null, nombre: string, uid: string }) {

        return new User(uid, nombre, email);
    }
    constructor(
        public uid: string,
        public nombre: string,
        public email: string | null

    ) { }
}