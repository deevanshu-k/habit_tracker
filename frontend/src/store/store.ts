import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import rootReducer from "./combine.reducer";
import { rootEpic } from "./combine.epic";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (m) => m().concat(epicMiddleware),
    devTools: true,
});

epicMiddleware.run(rootEpic);

export default store;
