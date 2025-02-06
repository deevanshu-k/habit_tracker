import {
    catchError,
    concat,
    from,
    mergeMap,
    Observable,
    of,
    switchMap,
} from "rxjs";
import {
    GlobalActions,
    globalLoadingEndAction,
    globalLoadingStartAction,
} from "../global/global.action";
import {
    FETCH_HABIT,
    fetchHabitFailAction,
    fetchHabitSuccessAction,
    HabitActions,
} from "./habit.action";
import { ofType } from "redux-observable";
import habitService from "../../api/habit.api";

export const getHabitsEpic = (
    action$: Observable<any>
): Observable<GlobalActions | HabitActions> =>
    action$.pipe(
        ofType(FETCH_HABIT),
        switchMap((action) =>
            concat(
                // of(globalLoadingStartAction()),
                from(
                    habitService.getHabits(
                        action.payload.month,
                        action.payload.year
                    )
                ).pipe(
                    mergeMap((data) =>
                        of(
                            // globalLoadingEndAction(),
                            fetchHabitSuccessAction(data)
                        )
                    ),
                    catchError((e) =>
                        of(
                            // globalLoadingEndAction(),
                            fetchHabitFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );
