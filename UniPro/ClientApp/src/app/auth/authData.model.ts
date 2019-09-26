export class AuthDataModel {
    constructor(
        public isAuth: boolean = false,
        public userName: string = '',
        public userRole: string = '',
        public userId: string = '',
        public isAdUser: boolean = false
    ) { }
}
