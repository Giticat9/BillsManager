import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux';

const rootNode = document.querySelector('.app')!;
const root = createRoot(rootNode);

root.render(
	<React.StrictMode>
		<Provider store={store}>
            <div>fasdfhasdjkfh</div>
        </Provider>
	</React.StrictMode>
);
