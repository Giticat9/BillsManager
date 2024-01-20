export enum StoreReducersNames {
	Application = 'application'
}

export type StoreReducerType<T = undefined, P = undefined, U = Record<StoreReducersNames, T>> = {
	[key in keyof U]?: P;
};

export interface IUser {
	id: number;
	name: string;
	birthDate: string;
	balance: number;
	bill: string;
}

export interface IAppStore {
	users: IUser[];
	selectedUserId: number;
	isShowWithdrawCashModal: boolean;
	isShowAddCashModal: boolean;
	isShowTransferModal: boolean;
}

export interface IWithdrawCashPayload {
	userId: number;
	howMany: number;
}

export interface IAddCashPayload extends IWithdrawCashPayload {}

export interface ITransferBetweenAccountsPayload {
	fromUserId: number;
	toUserId: number;
	howMany: number;
}

export type ModalTypes = 'withdrawCash' | 'addCash' | 'transfer';
export interface IOperationModalShowPayload {
	type: ModalTypes,
	isShow: boolean;
}