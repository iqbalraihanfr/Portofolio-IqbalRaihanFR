'use client';

import { formatNumber } from '@/lib/format';
import { useContentViews } from '@/lib/hooks/use-content-views';
import type { PropsForViews } from '@/types/blog';

export function ViewsCounter({
  slug,
  increment
}: PropsForViews): React.JSX.Element {
  const { views } = useContentViews(slug, { increment });

  return <p>{typeof views === 'number' ? formatNumber(views) : '---'} views</p>;
}
