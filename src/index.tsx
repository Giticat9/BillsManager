import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux';
import { GlobalStyle } from './ui/global';
import AppComponent from './app/app';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './ui/theme';

const rootNode = document.querySelector('.app')!;
const root = createRoot(rootNode);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={defaultTheme}>
				<GlobalStyle />
				<AppComponent />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
