import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en" className='dark'>
			<Head />
			<body className="dark:bg-zinc-950">
				<Main />
				<NextScript />
				<div id="hn-toast" />
			</body>
		</Html>
	);
}
