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
    DELETE_HABIT,
    deleteHabitFailAction,
    deleteHabitSuccessAction,
    FETCH_HABIT,
    FETCH_TODAY_HABITS,
    fetchHabitFailAction,
    fetchHabitSuccessAction,
    fetchTodayHabitsFailAction,
    fetchTodayHabitsSuccessAction,
    HabitActions,
    UPDATE_HABIT,
    UPDATE_HABITLOG,
    updateHabitFailAction,
    updateHabitLogFailAction,
    updateHabitLogSuccessAction,
    updateHabitSuccessAction,
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
                        action.payload.f,
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

export const updateHabitLogEpic = (
    action$: Observable<any>
): Observable<GlobalActions | HabitActions> =>
    action$.pipe(
        ofType(UPDATE_HABITLOG),
        switchMap((action) =>
            concat(
                of(globalLoadingStartAction()),
                from(
                    habitService.updateHabitLog(
                        action.payload.habit_id,
                        action.payload.date,
                        action.payload.month,
                        action.payload.year,
                        action.payload.is_done,
                        action.payload.note
                    )
                ).pipe(
                    mergeMap((data) =>
                        of(
                            globalLoadingEndAction(),
                            updateHabitLogSuccessAction({
                                habit_id: action.payload.habit_id,
                                date: action.payload.date,
                                month: action.payload.month,
                                year: action.payload.year,
                                is_done: data.is_done,
                                note: data.note,
                            })
                        )
                    ),
                    catchError((e) =>
                        of(
                            globalLoadingEndAction(),
                            updateHabitLogFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );

export const getTodayHabitsEpic = (
    action$: Observable<any>
): Observable<GlobalActions | HabitActions> =>
    action$.pipe(
        ofType(FETCH_TODAY_HABITS),
        switchMap(() =>
            concat(
                of(globalLoadingStartAction()),
                from(habitService.getTodayHabits()).pipe(
                    mergeMap((data) =>
                        of(
                            globalLoadingEndAction(),
                            fetchTodayHabitsSuccessAction(data)
                        )
                    ),
                    catchError((e) =>
                        of(
                            globalLoadingEndAction(),
                            fetchTodayHabitsFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );

export const deleteHabitEpic = (
    action$: Observable<any>
): Observable<GlobalActions | HabitActions> =>
    action$.pipe(
        ofType(DELETE_HABIT),
        switchMap((action) =>
            concat(
                of(globalLoadingStartAction()),
                from(habitService.deleteHabit(action.payload.id)).pipe(
                    mergeMap((data) =>
                        of(
                            globalLoadingEndAction(),
                            deleteHabitSuccessAction(data.id)
                        )
                    ),
                    catchError((e) =>
                        of(
                            globalLoadingEndAction(),
                            deleteHabitFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );

export const updateHabitEpic = (
    action$: Observable<any>
): Observable<GlobalActions | HabitActions> =>
    action$.pipe(
        ofType(UPDATE_HABIT),
        switchMap((action) =>
            concat(
                of(globalLoadingStartAction()),
                from(
                    habitService.updateHabit(
                        action.payload.id,
                        action.payload.title,
                        action.payload.description,
                        action.payload.color,
                        action.payload.f_type,
                        action.payload.f,
                        action.payload.is_archived
                    )
                ).pipe(
                    mergeMap((data) =>
                        of(
                            globalLoadingEndAction(),
                            updateHabitSuccessAction(data)
                        )
                    ),
                    catchError((e) =>
                        of(
                            globalLoadingEndAction(),
                            updateHabitFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );
