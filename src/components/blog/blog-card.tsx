import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/format';
import { Accent } from '@/components/ui/accent';
import { BlogStats } from './blog-stats';
import { BlogTag } from './blog-tag';
import type { Blog, CustomTag, ValidTag } from '@/types/blog';

type BlogCardProps<T extends ValidTag> = CustomTag<T> &
  Blog & {
    views?: number;
    isTagSelected?: (tag: string) => boolean;
  };

const DEFAULT_TAG = 'article' as const;

export function BlogCard<T extends ValidTag = typeof DEFAULT_TAG>({
  tag = DEFAULT_TAG as T,
  slug,
  tags,
  title,
  banner,
  readTime,
  bannerAlt,
  publishedAt,
  description,
  views: _views,
  bannerLink: _bannerLink,
  isTagSelected,
  ...rest
}: BlogCardProps<T>): React.JSX.Element {
  const CustomTag: ValidTag = tag;

  bannerAlt ??= title;

  const techTags = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',') : []);

  return (
    <CustomTag className='grid' {...rest}>
      <Link className='clickable' href={`/blog/${slug}`}>
        <div className='relative'>
          <Image
            className='h-36 w-full rounded-t-md object-cover'
            src={banner}
            alt={bannerAlt}
            title={bannerAlt}
            width={600}
            height={300}
          />
          <ul className='absolute bottom-0 flex w-full justify-end gap-2 p-2'>
            {techTags.map((tag) => (
              <BlogTag
                className='bg-opacity-80 dark:bg-opacity-60'
                tag='li'
                key={tag}
              >
                {isTagSelected && isTagSelected(tag) ? (
                  <Accent>{tag}</Accent>
                ) : (
                  tag
                )}
              </BlogTag>
            ))}
          </ul>
        </div>
        <section className='p-4 [&>div]:mt-1'>
          <h3 className='text-lg font-bold text-gray-800 dark:text-gray-100'>
            {title}
          </h3>
          <BlogStats slug={slug} readTime={readTime} />
          <p className='mt-4 text-sm font-bold text-gray-800 dark:text-gray-100'>
            {formatDate(publishedAt)}
          </p>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
            {description}
          </p>
        </section>
      </Link>
    </CustomTag>
  );
}
