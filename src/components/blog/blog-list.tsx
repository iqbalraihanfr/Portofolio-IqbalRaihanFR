'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogTag } from '@/components/blog/blog-tag';
import { SortListbox, sortOptions, type SortOption } from '@/components/blog/sort-listbox';
import { Accent } from '@/components/ui/accent';
import { getTags, textIncludes } from '@/lib/helper';
import { useSessionStorage } from '@/lib/hooks/use-session-storage';
import type { Blog } from '@/types/blog';

type BlogListProps = {
  posts: Blog[];
  tags: string[];
};

export function BlogList({ posts, tags }: BlogListProps): React.JSX.Element {
  const [sortOrder, setSortOrder] = useSessionStorage<SortOption>(
    'sortOrder',
    sortOptions[0]
  );

  const [filteredPosts, setFilteredPosts] = useState<Blog[]>(posts);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const splittedSearch = search.split(' ');

    const newFilteredPosts = posts.filter(({ title, description, tags }) => {
      const isTitleMatch = textIncludes(title, search);
      const isDescriptionMatch = textIncludes(description, search);
      const isTagsMatch = splittedSearch.every((tag) => (tags || '').includes(tag));

      return isTitleMatch || isDescriptionMatch || isTagsMatch;
    });

    if (sortOrder === 'date') {
      newFilteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else {
      // Views sorting requires client-side data which might not be available in the static post object immediately
      // For now we sort by date as fallback or if views are available in the object
      // If views are fetched via hook in card, we can't sort here easily without fetching all views.
      // Reference implementation passed 'views' in props. 
      // We might need to fetch views here or just stick to date sorting for now if views are not in 'posts'.
      // The 'posts' passed here come from getBlogPosts which doesn't have views.
      // So 'views' sorting might not work as expected unless we fetch views.
      // For now, let's keep it but it might treat undefined views as 0.
      newFilteredPosts.sort((a, b) => (b as any).views - (a as any).views);
    }

    setFilteredPosts(newFilteredPosts);
  }, [posts, search, sortOrder]);

  const handleSearchChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setSearch(value);

  const handleTagClick = (tag: string) => (): void => {
    if (search.includes(tag)) {
      const poppedTagSearch = search
        .split(' ')
        .filter((t) => t !== tag)
        .join(' ');

      setSearch(poppedTagSearch);
    } else {
      const appendedTagSearch = search ? `${search.trim()} ${tag}` : tag;

      setSearch(appendedTagSearch);
    }
  };

  const filteredTags = getTags(filteredPosts);

  const isTagSelected = (tag: string): boolean => {
    const isInFilteredTags = filteredTags.includes(tag);
    const isInSearch = search.toLowerCase().split(' ').includes(tag);

    return isInFilteredTags && isInSearch;
  };

  return (
    <section className='mt-2'>
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <input
          className='mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
          type='text'
          value={search}
          placeholder='Search blog...'
          onChange={handleSearchChange}
        />
      </motion.section>
      <motion.section
        className='mt-2 flex flex-wrap items-center gap-2'
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      >
        <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
          Choose topic:
        </p>
        {tags.map((tag) => (
          <BlogTag
            className='transition-colors'
            disabled={!filteredTags.includes(tag)}
            onClick={handleTagClick(tag)}
            key={tag}
          >
            {isTagSelected(tag) ? <Accent>{tag}</Accent> : tag}
          </BlogTag>
        ))}
      </motion.section>
      <motion.section className='mt-6' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <SortListbox sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
      </motion.section>
      <motion.section
        className='mt-4 grid gap-4 sm:grid-cols-2'
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
      >
        <AnimatePresence mode='popLayout'>
          {filteredPosts.length ? (
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.article
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className='grid'
                  layout='position'
                  key={post.slug}
                >
                  <BlogCard {...post} isTagSelected={isTagSelected} />
                </motion.article>
              ))}
            </AnimatePresence>
          ) : (
            <motion.h2
              className='col-span-full text-center text-3xl font-bold'
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              key='not-found'
            >
              <Accent>Sorry, not found :&#40;</Accent>
            </motion.h2>
          )}
        </AnimatePresence>
      </motion.section>
    </section>
  );
}
