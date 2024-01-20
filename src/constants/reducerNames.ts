import { StoreReducersNames } from '@store';

const REDUCER_NAMES: Record<keyof typeof StoreReducersNames, string> = {
	Application: 'application'
};

export default REDUCER_NAMES;
