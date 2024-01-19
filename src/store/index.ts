import { Middleware } from 'redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

const combinedReducers = combineReducers({});

const middlewares: Middleware[] = [];
if (process.env.NODE_ENV === 'development') {
	const logger = createLogger();
	//@ts-ignore
	middlewares.push(logger);
}

const store = configureStore({
	reducer: combinedReducers,
	middleware: getDefaultMiddlewares => getDefaultMiddlewares().concat(middlewares),
	devTools: process.env.NODE_ENV === 'production'
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
