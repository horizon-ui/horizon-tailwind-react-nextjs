'use client';
import NextImage from 'next/legacy/image';

function parseAssetPrefix(image: string) {
  const alreadyHasHttp = image.match('http');
  if (alreadyHasHttp) return image;

  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const alreadyHasPrefix = image.match(prefix);

  const finalUrl = alreadyHasPrefix ? image : `${prefix}${image}`;
  return finalUrl;
}

export function Image(props: { [x: string]: any }) {
  const { src, alt, className, nextProps = {}, ...rest } = props;

  const imageUrl =
    typeof src === 'string' ? src : ((src as any)?.src as string);
  return (
    <div className={`relative overflow-hidden ${className}`} {...rest}>
      <NextImage
        layout="fill"
        objectFit="fill"
        src={parseAssetPrefix(imageUrl)}
        alt={alt}
        {...nextProps}
      />
    </div>
  );
}
