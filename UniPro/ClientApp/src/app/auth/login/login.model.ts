export class LoginModel {
    private _userName: string;
    get UserName() { return this._userName; }
    set UserName(val: string) { this._userName = val; }

    private _password: string;
    get Password() { return this._password; }
    set Password(val: string) { this._password = val; }
}
