import * as React from 'react';
import { AppContext, IAppContext } from '../../context/appContext';
import styled from 'styled-components';
import { Button, Flex } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, SendOutlined } from '@ant-design/icons';
import { ModalTypes } from 'src/@types/@store';

const Wrapper = styled.div`
	display: block;
	width: 100%;
	height: 100%;
	min-height: 360px;
	padding: 24px;
	background: rgb(255, 255, 255);
	border-radius: 8px;
`;

const Header = styled.h1`
	font-size: 32px;
	font-weight: 600;
	color: #1c1c1c;
	margin: 0 0 1rem;
`;

const Bill = styled.h2`
	font-size: 16px;
	font-weight: 400;
	color: #1c1c1c;
	margin: 0 0 2rem;
`;

const Balance = styled.span`
	display: block;
	font-size: 26px;
	font-weight: 400;
	color: #1c1c1c;
	margin: 0 0 2rem;
`;

interface IProps {
	onOpenModal(type: ModalTypes): () => void;
}

const ContentComponent: React.FC<IProps> = ({ onOpenModal }) => {
	const { users, selectedUserId } = React.useContext<IAppContext>(AppContext);

	const selectedUser = users.find(x => x.id === +selectedUserId);

	return (
		<Wrapper>
			<Header>{selectedUser?.name}</Header>
			<Bill>
				<b>Лицевой счет:</b> {selectedUser?.bill}
			</Bill>
			<Balance>
				<b>Текущий баланс:</b> {selectedUser?.balance}₽
			</Balance>
			<Flex
				gap='small'
				wrap='nowrap'
			>
				<Button
					type='primary'
					icon={<ArrowDownOutlined />}
					onClick={onOpenModal('withdrawCash')}
				>
					Снять
				</Button>
				<Button
					type='primary'
					icon={<ArrowUpOutlined />}
					onClick={onOpenModal('addCash')}
				>
					Внести
				</Button>
				<Button
					type='primary'
					icon={<SendOutlined />}
					onClick={onOpenModal('transfer')}
				>
					Перевести
				</Button>
			</Flex>
		</Wrapper>
	);
};

export default ContentComponent;
