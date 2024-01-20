import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			global: {
				color: string;
				lightBg: string;
			};
		};
	}
}
