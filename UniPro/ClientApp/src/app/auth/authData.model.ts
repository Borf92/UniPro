export class AuthDataModel {
    private _isAuth: boolean;
    get IsAuth() { return this._isAuth; }
    set IsAuth(val: boolean) { this._isAuth = val; }

    private _userName: string;
    get UserName() { return this._userName; }
    set UserName(val: string) { this._userName = val; }

    private _userRole: string;
    get UserRole() { return this._userRole; }
    set UserRole(val: string) { this._userRole = val; }

    private _userId: string;
    get UserId() { return this._userId; }
    set UserId(val: string) { this._userId = val; }

    private _token: string;
    get Token() { return this._token; }
    set Token(val: string) { this._token = val; }

    private _refreshToken: string;
    get RefreshToken() { return this._refreshToken; }
    set RefreshToken(val: string) { this._refreshToken = val; }
}
