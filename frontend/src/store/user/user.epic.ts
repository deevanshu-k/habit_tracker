import { catchError, concat, from, mergeMap, Observable, of } from "rxjs";
import {
    FETCH_USER,
    fetchUserFailAction,
    fetchUserSuccessAction,
    LOGOUT_USER,
    logoutUserSuccessAction,
    UserActions,
} from "./user.action";
import { ofType } from "redux-observable";
import userService from "../../api/user.api";
import {
    GlobalActions,
    globalLoadingEndAction,
    globalLoadingStartAction,
} from "../global/global.action";
import authService from "../../api/auth.api";

export const logoutUserEpic = (
    action$: Observable<any>
): Observable<UserActions | GlobalActions> =>
    action$.pipe(
        ofType(LOGOUT_USER),
        mergeMap(() =>
            concat(
                of(globalLoadingStartAction()),
                from(authService.signOut()).pipe(
                    mergeMap(() =>
                        of(globalLoadingEndAction(), logoutUserSuccessAction())
                    ),
                    catchError(() => of(globalLoadingEndAction()))
                )
            )
        )
    );

export const fetchUserEpic = (
    action$: Observable<any>
): Observable<UserActions | GlobalActions> =>
    action$.pipe(
        ofType(FETCH_USER),
        mergeMap(() =>
            concat(
                of(globalLoadingStartAction()),
                from(userService.getUser()).pipe(
                    mergeMap((user) =>
                        of(
                            globalLoadingEndAction(),
                            fetchUserSuccessAction(user)
                        )
                    ),
                    catchError((e) =>
                        of(
                            globalLoadingEndAction(),
                            fetchUserFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );
