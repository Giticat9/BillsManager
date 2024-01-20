import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const TextBlock = styled.span`
	color: ${({ theme }) => theme.colors.global.color};
	font-size: 13px;
`;

const FooterComponent: React.FC = () => {
	const dateRef = React.useRef<HTMLElement>(null);

	React.useEffect(() => {
		if (!!dateRef.current) {
			dateRef.current.innerHTML = `${new Date().getFullYear()}`;
		}
	}, []);

	return (
		<Wrapper>
			<TextBlock>
				<span ref={dateRef} /> @ Created demo page by Zhuravlev Ivan{' '}
			</TextBlock>
		</Wrapper>
	);
};

export default FooterComponent;
