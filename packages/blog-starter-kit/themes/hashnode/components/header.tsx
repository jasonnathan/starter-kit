import { twJoin } from 'tailwind-merge';
import { lightOrDark } from '../utils/commonUtils';
import { useAppContext } from './contexts/appContext';
import { Button } from './custom-button';
import HeaderBlogSearch from './header-blog-search';
import HeaderLeftSidebar from './header-left-sidebar';
import PublicationLogo from './publication-logo';
import PublicationNavLinks from './publication-nav-links';

type Props = {
	currentMenuId?: string | null;
	isHome: boolean;
};

export const Header = ({ currentMenuId, isHome }: Props) => {
	const { publication } = useAppContext();
	const theme = lightOrDark(publication.preferences?.darkMode ? 'dark' : 'light');

	return (
		<header
			className={twJoin(
				'relative z-50 w-full border-y border-black/10 px-4 pt-4',
				theme === 'dark' ? 'bg-neutral-900 dark:border-white/10' : 'bg-white dark:bg-neutral-900'
			)}
		>
			<div className="container mx-auto flex h-14 items-center justify-between px-4">
				{/* Left Sidebar (Mobile) */}
				<div className="md:hidden">
					<HeaderLeftSidebar publication={publication} />
				</div>

				{/* Center - Text Logo */}
				<PublicationLogo publication={publication} size="xl" />

				{/* Right - Search & Button */}
				<div className="flex flex-row items-center">
					<HeaderBlogSearch publication={publication} />
					<Button as="a" href="#" type="primary" label="Sign up" />
				</div>
			</div>

			{/* Navigation with top & bottom borders */}
			<nav>
				<div className="container mx-auto flex justify-center py-2">
					<PublicationNavLinks
						isHome={isHome}
						currentActiveMenuItemId={currentMenuId}
						enabledPages={publication.preferences?.enabledPages}
						navbarItems={publication.preferences?.navbarItems || []}
					/>
				</div>
			</nav>
		</header>
	);
};
