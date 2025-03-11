import { useAnalytics } from './useAnalytics';
import { Integrations } from './integrations';
import { Meta } from './meta';
import { Scripts } from './scripts';

type Props = {
	children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
	useAnalytics();
	return (
		<>
			<Meta />
			<Scripts />
			<div className="min-h-screen bg-white dark:bg-neutral-900">
				<main>{children}</main>
			</div>
			<Integrations />
		</>
	);
};
