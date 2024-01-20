import { Button, Input, Modal, Space } from 'antd';
import * as React from 'react';
import { IAppContext, AppContext } from '../../context/appContext';

interface IProps {
	isShow: boolean;

	onSubmit(userId: number, cash: number): void;
	onClose(): void;
}

const WithdrawCashModal: React.FC<IProps> = props => {
	const { isShow, onSubmit, onClose } = props;
	const { users, selectedUserId } = React.useContext<IAppContext>(AppContext);
	const [cashValue, setCashValue] = React.useState<number | null>();

	React.useEffect(() => {
		if (!isShow) {
			!!cashValue && setCashValue(null);
		}
	}, [isShow]);

	const user = users.find(x => x.id === +selectedUserId);

	const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		if (+value >= 0) {
			setCashValue(+value);
		}
	};

	const handlerSubmitClick = () => {
		if (!!cashValue && cashValue <= user?.balance!) {
			onSubmit && onSubmit(user?.id!, cashValue);
			onClose && onClose();
		}
	};

	return (
		<Modal
			open={isShow}
			title='Снятие суммы с баланса'
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
					onClick={handlerSubmitClick}
					disabled={!!!cashValue || cashValue > user?.balance!}
				>
					Снять
				</Button>
			]}
		>
			<Space
				direction='vertical'
				size='middle'
				style={{ marginBottom: '1rem' }}
			>
				Введите сумму, которую необходимо снять со счета
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

export default WithdrawCashModal;
