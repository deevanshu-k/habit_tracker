import {
    catchError,
    concat,
    from,
    mergeMap,
    Observable,
    of,
} from "rxjs";
import {
    FETCH_USER,
    fetchUserFailAction,
    fetchUserSuccessAction,
    UserActions,
} from "./user.action";
import { ofType } from "redux-observable";
import userService from "../../api/user.api";
import {
    GlobalActions,
    globalLoadingEndAction,
    globalLoadingStartAction,
} from "../global/global.action";

export const fetchUserEpic = (
    action$: Observable<any>
): Observable<UserActions | GlobalActions> =>
    action$.pipe(
        ofType(FETCH_USER),
        mergeMap(() =>
            concat(
                of(globalLoadingStartAction()), // Emit loading start before API call
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
