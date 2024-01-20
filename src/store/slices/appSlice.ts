import {
	IAddCashPayload,
	IAppStore,
	IOperationModalShowPayload,
	ITransferBetweenAccountsPayload,
	IWithdrawCashPayload,
	StoreReducerType,
	StoreReducersNames
} from '@store';
import { getUsersMock } from '../..//mocks/user.mock';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import REDUCER_NAMES from '../../constants/reducerNames';

type AppReducerType = StoreReducerType<StoreReducersNames.Application, IAppStore>;

const initialState: IAppStore = {
	users: getUsersMock(),
	selectedUserId: 1,
	isShowWithdrawCashModal: false,
	isShowAddCashModal: false,
	isShowTransferModal: false
};

const appSlice = createSlice({
	name: REDUCER_NAMES.Application,
	initialState,
	reducers: {
		setSelectedUserId: (state, action: PayloadAction<number>) => {
			state.selectedUserId = action.payload;
		},
		withdrawCash: (store, action: PayloadAction<IWithdrawCashPayload>) => {
			const user = store.users.find(x => x.id === action.payload.userId);

			if (!!user) {
				store.users = store.users.map(user =>
					user.id === action.payload.userId
						? { ...user, balance: user.balance - action.payload.howMany }
						: user
				);
			}
		},
		addCash: (store, action: PayloadAction<IAddCashPayload>) => {
			const user = store.users.find(x => x.id === action.payload.userId);

			if (!!user) {
				store.users = store.users.map(user =>
					user.id === action.payload.userId
						? { ...user, balance: user.balance + action.payload.howMany }
						: user
				);
			}
		},
		transferBetweenAccounts: (store, action: PayloadAction<ITransferBetweenAccountsPayload>) => {
			const fromUser = store.users.find(x => x.id === action.payload.fromUserId);
			const toUser = store.users.find(x => x.id === action.payload.toUserId);

			if (!!fromUser && !!toUser) {
				store.users = store.users.map(user =>
					user.id === fromUser.id
						? { ...user, balance: user.balance - action.payload.howMany }
						: user.id === toUser.id
						? { ...user, balance: user.balance + action.payload.howMany }
						: user
				);
			}
		},
		setOperationModalShow: (store, action: PayloadAction<IOperationModalShowPayload>) => {
			if (action.payload.type === 'withdrawCash' && action.payload.isShow !== store.isShowWithdrawCashModal) {
				store.isShowWithdrawCashModal = action.payload.isShow;
				store.isShowAddCashModal = false;
				store.isShowTransferModal = false;
			} else if (action.payload.type === 'addCash' && action.payload.isShow !== store.isShowAddCashModal) {
				store.isShowWithdrawCashModal = false;
				store.isShowAddCashModal = action.payload.isShow;
				store.isShowTransferModal = false;
			} else if (action.payload.type === 'transfer' && action.payload.isShow !== store.isShowTransferModal) {
				store.isShowWithdrawCashModal = false;
				store.isShowAddCashModal = false;
				store.isShowTransferModal = action.payload.isShow;
			}
		}
	}
});

export const selectUsers = (store: AppReducerType) => store.application?.users;
export const selectSelectedUser = (store: AppReducerType) => store.application?.selectedUserId;
export const selectOperationModalShows = (store: AppReducerType) => ({
	isShowWithdrawCashModal: store.application?.isShowWithdrawCashModal,
	isShowAddCashModal: store.application?.isShowAddCashModal,
	isShowTransferModal: store.application?.isShowTransferModal
});

export const { setSelectedUserId, setOperationModalShow, withdrawCash, addCash, transferBetweenAccounts } = appSlice.actions;

export default appSlice.reducer;
