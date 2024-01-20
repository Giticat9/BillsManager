import { Avatar, Menu } from 'antd';
import * as React from 'react';
import { AppContext, IAppContext } from '../../context/appContext';
import styled from 'styled-components';

const MenuItemWrapper = styled.div`
	display: flex;
	flex-flow: column;
`;

const MenuItemHeader = styled.div``;

const MenuItemDescription = styled.div`
	display: flex;
	flex-flow: column;
	margin: 0 0 7px;

	& > span {
		line-height: 1.25;
		font-size: 12px;
		color: ${({ theme }) => theme.colors.global.color};
		margin-left: 38px;
	}
`;

interface IProps {
	onChangeSelectedUserId(id: number): void;
}

const MenuComponent: React.FC<IProps> = ({ onChangeSelectedUserId }) => {
	const { users, selectedUserId } = React.useContext<IAppContext>(AppContext);

	const hanlderOnSelect = (e: any): void => {
		const { key } = e;

		onChangeSelectedUserId && onChangeSelectedUserId(+key);
	};

	return (
		<Menu
			theme='light'
			style={{ padding: '12px 0' }}
			selectedKeys={[`${selectedUserId}`]}
			onSelect={hanlderOnSelect}
		>
			<Menu.ItemGroup title='Пользователи'>
				{!!users?.length &&
					users.map(item => (
						<Menu.Item
							key={item.id}
							style={{ height: 'auto' }}
						>
							<MenuItemWrapper>
								<MenuItemHeader>
									<Avatar
										style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', marginRight: 7 }}
									>
										{item.name
											.split(' ')
											.map(x => x[0].toUpperCase())
											.join('')}
									</Avatar>
									{item.name}
								</MenuItemHeader>
								<MenuItemDescription>
									<span>Л.с.: {item.bill}</span>
									<span>Баланс: {item.balance}₽</span>
								</MenuItemDescription>
							</MenuItemWrapper>
						</Menu.Item>
					))}
			</Menu.ItemGroup>
		</Menu>
	);
};

export default MenuComponent;
