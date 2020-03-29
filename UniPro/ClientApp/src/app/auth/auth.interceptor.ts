import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, retryWhen, retry } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;

    constructor(private auth: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const started = Date.now();
        let ok: string;
        const authReq = (this.auth.isAuth())
            ? req.clone({ headers: req.headers.set('Authorization', this.auth.getToken()) })
            : req;

        return next.handle(authReq).
            pipe(
                catchError((err, caught) => {
                    if (err.status === 401 ) {
                        if (err.headers.has('Token-Expired') && this.auth.isAuth()) {
                            this.auth.refreshToken();
                            // retry(1);
                        } else {
                            this.router.navigate(['/auth/login']);
                        }
                    } else {
                        console.log('Код ошибки : ' + err.status + '. Текст: ' + err.error);
                    }
                    throw caught;
                }
            )
                // // Log when response observable either completes or errors
                // finalize(() => {
                //     const elapsed = Date.now() - started;
                //     const msg = `${req.method} "${req.urlWithParams}"
                //  ${ok} in ${elapsed} ms.`;
                //     console.log(msg);
                // })
            );
    }
}
