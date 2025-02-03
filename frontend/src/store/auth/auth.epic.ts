import { ofType } from "redux-observable";
import {
    AuthActions,
    FETCH_USER,
    fetchUserDetail,
    fetchUserDetailFail,
    fetchUserDetailSuccess,
    SIGNIN,
    signinFail,
    signinSuccess,
    SIGNOUT,
    signoutSuccess,
} from "./auth.action";
import { Observable, of, mergeMap, from, map, catchError, concat } from "rxjs";
import authService from "../../api/auth.api";
import userService from "../../api/user.api";

export const signinEpic = (action$: Observable<any>): Observable<AuthActions> =>
    action$.pipe(
        ofType(SIGNIN),
        mergeMap((action) =>
            from(
                authService.signin(
                    action.payload.email,
                    action.payload.password
                )
            ).pipe(
                mergeMap(() =>
                    concat(
                        of(fetchUserDetail()),
                        of(
                            signinSuccess({
                                id: window.crypto.randomUUID(),
                                email: action.payload.email,
                                name: "",
                            })
                        )
                    )
                ),
                catchError((e) => of(signinFail(e.response.data.message)))
            )
        )
    );

export const fetchUserDetailEpic = (
    action$: Observable<any>
): Observable<AuthActions> =>
    action$.pipe(
        ofType(FETCH_USER),
        mergeMap(() =>
            from(userService.getUser()).pipe(
                map((user) => fetchUserDetailSuccess(user)),
                catchError((e) =>
                    of(fetchUserDetailFail(e.response.data.message))
                )
            )
        )
    );

export const signOutEpic = (
    action$: Observable<any>
): Observable<AuthActions> =>
    action$.pipe(
        ofType(SIGNOUT),
        mergeMap(() =>
            from(authService.signOut()).pipe(map(() => signoutSuccess()))
        )
    );
