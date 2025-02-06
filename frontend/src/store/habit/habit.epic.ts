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
    ADD_HABIT,
    addHabitFailAction,
    addHabitSuccessAction,
    FETCH_HABIT,
    fetchHabitFailAction,
    fetchHabitSuccessAction,
    HabitActions,
} from "./habit.action";
import { ofType } from "redux-observable";
import habitService from "../../api/habit.api";
import { HabitFreqType } from "../store.type";

export const getHabitsEpic = (
    action$: Observable<any>
): Observable<GlobalActions | HabitActions> =>
    action$.pipe(
        ofType(FETCH_HABIT),
        switchMap((action) =>
            concat(
                of(globalLoadingStartAction()),
                from(
                    habitService.getHabits(
                        action.payload.month,
                        action.payload.year
                    )
                ).pipe(
                    mergeMap((data) =>
                        of(
                            globalLoadingEndAction(),
                            fetchHabitSuccessAction(data)
                        )
                    ),
                    catchError((e) =>
                        of(
                            globalLoadingEndAction(),
                            fetchHabitFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );

export const addHabitEpic = (
    action$: Observable<any>
): Observable<GlobalActions | HabitActions> =>
    action$.pipe(
        ofType(ADD_HABIT),
        switchMap((action) =>
            concat(
                of(globalLoadingStartAction()),
                from(
                    habitService.addHabit(
                        action.payload.title,
                        action.payload.description,
                        HabitFreqType.FIXED_DAYS,
                        1111111,
                        action.payload.color
                    )
                ).pipe(
                    mergeMap((data) =>
                        of(
                            globalLoadingEndAction(),
                            addHabitSuccessAction(data)
                        )
                    ),
                    catchError((e) =>
                        of(
                            globalLoadingEndAction(),
                            addHabitFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );
