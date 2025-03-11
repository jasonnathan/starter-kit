import { ImgHTMLAttributes } from 'react';
import Image, { ImageProps } from 'next/image';

type Props = {
  src: string | null; // Ensure it's a string or null
  alt: string;
  originalSrc: string;
  width?: number;
  height?: number;
} & ImgHTMLAttributes<any> &
  ImageProps;

/**
 * Conditionally renders Next.js Image component for all images.
 * GIFs are handled using `unoptimized: true` instead of `<img>`.
 */
function CustomImage(props: Props) {
  const { originalSrc, width = 100, height = 100, ...restOfTheProps } = props;
  const {
    alt = '',
    src,
    loader,
    quality,
    priority,
    loading,
    placeholder,
    blurDataURL,
    ...imgProps
  } = restOfTheProps;

  // Validate image source
  if (!originalSrc || typeof originalSrc !== 'string') {
    console.warn('CustomImage: Invalid or missing image source.');
    return null;
  }

  const isGif = originalSrc.endsWith('.gif');

  return (
    <Image
      {...imgProps}
      src={src || originalSrc}
      alt={alt}
      width={width}
      height={height}
      unoptimized={isGif}
    />
  );
}

export default CustomImage;
