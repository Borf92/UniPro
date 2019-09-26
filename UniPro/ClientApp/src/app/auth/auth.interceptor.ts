import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.auth.refreshToken();

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
}
