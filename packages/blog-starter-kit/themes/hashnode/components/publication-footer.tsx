import Link from 'next/link';
import CustomImage from './custom-image'; // ✅ Uses CustomImage for optimization
import { resizeImage } from '../utils/image';

type Props = {
  isTeam?: boolean;
  authorName: string;
  title?: string;
  imprint?: string;
  logo?: string | null;
};

function PublicationFooter({ isTeam, authorName, title = 'Geekist.co', imprint, logo }: Props) {
  return (
    <footer className="border-t border-gray-700 bg-neutral-900 text-center text-slate-300 md:px-5 md:py-6 lg:py-10">
      {/* Impressum Section (If Provided) */}
      {imprint && (
        <section className="mx-auto mb-10 rounded-lg border border-gray-700 bg-black px-4 py-6 text-left lg:w-3/4 xl:w-2/3">
          <p className="mb-4 text-center font-bold uppercase tracking-wider text-gray-400">
            Impressum
          </p>
          <div
            className="prose mx-auto w-full dark:prose-dark"
            dangerouslySetInnerHTML={{ __html: imprint }}
          />
        </section>
      )}

      {/* Footer Credits */}
      <div className="flex flex-col items-center justify-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} {title}
        </p>

        {/* Privacy & Terms Links */}
        <div className="flex space-x-4">
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <span className="opacity-50">&middot;</span>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <span className="opacity-50">&middot;</span>
          <a href="https://github.com/theGeekist" className="hover:underline">
            GitHub
          </a>
        </div>

        {/* Logo (If Available) */}
        {logo && (
          <div className="mt-6">
            <Link href="/" className="relative block h-10 w-40">
              <CustomImage
                className="h-full w-full object-contain"
                src={resizeImage(logo, { w: 1000, h: 250, c: 'thumb' })}
                originalSrc={logo}
                width={1000}
                height={250}
                alt={title}
              />
            </Link>
          </div>
        )}

        {/* Final Signature Line */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Built with ❤️ for geeks, by geeks.
        </p>
      </div>
    </footer>
  );
}

export default PublicationFooter;
