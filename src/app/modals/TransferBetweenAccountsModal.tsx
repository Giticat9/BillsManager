import { Button, Input, Modal, Select, Space } from 'antd';
import * as React from 'react';
import { AppContext, IAppContext } from '../../context/appContext';

interface IProps {
	isShow: boolean;

	onSubmit(fromUserId: number, cash: number, toUserId: number): void;
	onClose(): void;
}

const TransferBetweenAccountModal: React.FC<IProps> = props => {
	const { isShow, onSubmit, onClose } = props;
	const { users, selectedUserId } = React.useContext<IAppContext>(AppContext);
	const [cashValue, setCashValue] = React.useState<number | null>();
	const [toUserValue, setToUserValue] = React.useState<number | null>();

	React.useEffect(() => {
		if (!isShow) {
			cashValue !== null && setCashValue(null);
			toUserValue !== null && setToUserValue(null);
		}
	}, [isShow]);

	const user = users.find(x => x.id === +selectedUserId);

	const selectInputOptions = React.useMemo(
		() =>
			users
				.filter(x => x.id !== selectedUserId)
				.map(x => ({
					label: x.name,
					value: x.bill
				})),
		[selectedUserId]
	);

	const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		if (+value >= 0) {
			setCashValue(+value);
		}
	};

	const handlerChangeSelect = (value: number) => {
		if (value !== null && value !== toUserValue) {
			setToUserValue(value);
		}
	};

	const handlerSubmitClick = () => {
		if (!!toUserValue && !!cashValue && cashValue > 0) {
			const toUserId = users.find(x => x.bill === `${toUserValue}`)?.id ?? -1;

			if (toUserId !== null && toUserId >= 0) {
				onSubmit && onSubmit(user?.id!, cashValue, toUserId);
				onClose && onClose();
			}
		}
	};

	return (
		<Modal
			open={isShow}
			title='Перевод средств между счетами'
			onCancel={onClose}
			footer={[
				<Button
					type='default'
					key='back'
					onClick={onClose}
				>
					Закрыть
				</Button>,
				<Button
					type='primary'
					key='submit'
					disabled={!toUserValue || !cashValue || cashValue <= 0 || cashValue > user?.balance!}
					onClick={handlerSubmitClick}
				>
					Перевести
				</Button>
			]}
		>
			<Space
				direction='vertical'
				size='middle'
				style={{ marginBottom: '1rem' }}
			>
				Выберите пользователя, которому необходимо выполнить перевод
				<Select
					placeholder='Выберите пользователя для перевода'
					showSearch
					optionFilterProp='children'
					filterOption={(input, options) =>
						(options?.label ?? '').toLowerCase().includes(input.toLowerCase())
					}
					options={selectInputOptions}
					value={toUserValue}
					onChange={handlerChangeSelect}
					style={{ width: '100%' }}
				/>
				Введите сумму, которую необходимо перевести на счет
				<Input
					placeholder='Введите сумму'
					min={0}
					value={cashValue!}
					onChange={handlerChangeInput}
				/>
			</Space>
		</Modal>
	);
};

export default TransferBetweenAccountModal;
