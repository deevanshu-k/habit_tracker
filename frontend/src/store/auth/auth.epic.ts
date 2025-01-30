import { ofType } from "redux-observable";
import { AuthActions, SIGNIN, signinSuccess } from "./auth.action";
import { mergeMap, Observable, of, switchMap, tap } from "rxjs";

export const signinEpic = (action$: Observable<any>): Observable<AuthActions> =>
    action$.pipe(
        ofType(SIGNIN),
        switchMap(() => {
            const user = {
                id: "1",
                name: "John Doe",
                email: "john@example.com",
            };
            return of(signinSuccess(user));
        })
    );
