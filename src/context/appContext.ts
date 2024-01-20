import { IUser } from '@store';
import { createContext } from 'react';

export interface IAppContext {
	users: IUser[];
    selectedUserId: number;
}

const initialContext: IAppContext = {
	users: [],
    selectedUserId: 1
};

export const AppContext = createContext<IAppContext>(initialContext);
