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
    ADD_TODO,
    addTodoFailAction,
    addTodoSuccessAction,
    DELETE_TODO,
    deleteTodoFailAction,
    deleteTodoSuccessAction,
    FETCH_TODAY_TODOS,
    fetchTodayTodosFailAction,
    fetchTodayTodosSuccessAction,
    TodoActions,
    UPDATE_TODO,
    updateTodoFailAction,
    updateTodoSuccessAction,
} from "./todo.action";
import { ofType } from "redux-observable";
import todoService from "../../api/todo.api";

export const getTodayTodosEpic = (
    action$: Observable<any>
): Observable<GlobalActions | TodoActions> =>
    action$.pipe(
        ofType(FETCH_TODAY_TODOS),
        switchMap(() =>
            concat(
                of(globalLoadingStartAction()),
                from(todoService.getTodayTodos()).pipe(
                    mergeMap((data) =>
                        of(
                            globalLoadingEndAction(),
                            fetchTodayTodosSuccessAction(data)
                        )
                    ),
                    catchError((e) =>
                        of(
                            globalLoadingEndAction(),
                            fetchTodayTodosFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );

export const addTodosEpic = (
    action$: Observable<any>
): Observable<GlobalActions | TodoActions> =>
    action$.pipe(
        ofType(ADD_TODO),
        switchMap((action) =>
            concat(
                of(globalLoadingStartAction()),
                from(todoService.createTodo(action.payload)).pipe(
                    mergeMap((data) =>
                        of(globalLoadingEndAction(), addTodoSuccessAction(data))
                    ),
                    catchError((e) =>
                        of(
                            globalLoadingEndAction(),
                            addTodoFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );

export const updateTodosEpic = (
    action$: Observable<any>
): Observable<GlobalActions | TodoActions> =>
    action$.pipe(
        ofType(UPDATE_TODO),
        switchMap((action) =>
            concat(
                of(globalLoadingStartAction()),
                from(
                    todoService.updateTodo(
                        action.payload.id,
                        action.payload.title,
                        action.payload.is_done
                    )
                ).pipe(
                    mergeMap((data) =>
                        of(
                            globalLoadingEndAction(),
                            updateTodoSuccessAction(data)
                        )
                    ),
                    catchError((e) =>
                        of(
                            globalLoadingEndAction(),
                            updateTodoFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );

export const deleteTodosEpic = (
    action$: Observable<any>
): Observable<GlobalActions | TodoActions> =>
    action$.pipe(
        ofType(DELETE_TODO),
        switchMap((action) =>
            concat(
                of(globalLoadingStartAction()),
                from(todoService.deleteTodo(action.payload.id)).pipe(
                    mergeMap((data) =>
                        of(
                            globalLoadingEndAction(),
                            deleteTodoSuccessAction(data.id)
                        )
                    ),
                    catchError((e) =>
                        of(
                            globalLoadingEndAction(),
                            deleteTodoFailAction(e.response.data.message)
                        )
                    )
                )
            )
        )
    );
