import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
	addCash,
	selectOperationModalShows,
	selectSelectedUser,
	selectUsers,
	setOperationModalShow,
	setSelectedUserId,
	transferBetweenAccounts,
	withdrawCash
} from '../store/slices/appSlice';
import { Layout } from 'antd';
import styled from 'styled-components';
import { AppContext } from '../context/appContext';
import { ContentComponent, FooterComponent, MenuComponent } from './components';
import { ModalTypes } from 'src/@types/@store';
import { AddCashModal, TransferBetweenAccountsModal, WithdrawCashModal } from './modals';

const { Sider, Content, Footer } = Layout;

const LayoutWrapper = styled(Layout)`
	min-height: 100%;
`;

const AppComponent: React.FC = () => {
	const dispatch = useAppDispatch();

	const users = useAppSelector(selectUsers);
	const selectedUserId = useAppSelector(selectSelectedUser);
	const operationModalShows = useAppSelector(selectOperationModalShows);

	const handlerChangeSelectedUserId = (id: number): void => {
		void dispatch(setSelectedUserId(id));
	};

	const handlerOpenModal = (type: ModalTypes) => () => {
		void dispatch(setOperationModalShow({ type, isShow: true }));
	};

	const handlerCloseModal = (type: ModalTypes) => () => {
		void dispatch(setOperationModalShow({ type, isShow: false }));
	};

	const handlerSubmitModal = (type: ModalTypes) => (userId: number, cash: number, toUserId?: number) => {
		if (type === 'withdrawCash') {
			void dispatch(withdrawCash({ userId, howMany: cash }));
		} else if (type === 'addCash') {
			void dispatch(addCash({ userId, howMany: cash }));
		} else if (type === 'transfer') {
			void dispatch(transferBetweenAccounts({ fromUserId: userId, toUserId: toUserId!, howMany: cash }));
		}
	};

	return (
		<AppContext.Provider value={{ users: users!, selectedUserId: selectedUserId! }}>
			<LayoutWrapper>
				<Sider theme='light'>
					<MenuComponent onChangeSelectedUserId={handlerChangeSelectedUserId} />
				</Sider>
				<Layout>
					<Content style={{ margin: 12 }}>
						<ContentComponent onOpenModal={handlerOpenModal} />
					</Content>
					<Footer>
						<FooterComponent />
					</Footer>
				</Layout>
			</LayoutWrapper>
			<WithdrawCashModal
				isShow={operationModalShows.isShowWithdrawCashModal!}
				onSubmit={handlerSubmitModal('withdrawCash')}
				onClose={handlerCloseModal('withdrawCash')}
			/>
			<AddCashModal
				isShow={operationModalShows.isShowAddCashModal!}
				onSubmit={handlerSubmitModal('addCash')}
				onClose={handlerCloseModal('addCash')}
			/>
			<TransferBetweenAccountsModal
				isShow={operationModalShows.isShowTransferModal!}
				onSubmit={handlerSubmitModal('transfer')}
				onClose={handlerCloseModal('transfer')}
			/>
		</AppContext.Provider>
	);
};

export default AppComponent;
