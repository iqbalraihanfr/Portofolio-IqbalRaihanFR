import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';

export type Content = {
  tags: string;
  slug: string;
  title: string;
  banner: string;
  readTime: string;
  description: string;
  publishedAt: string;
  lastUpdatedAt?: string;
};

export type Blog = Content & {
  bannerAlt?: string;
  bannerLink?: string;
};

export type ValidTag = keyof React.JSX.IntrinsicElements | ElementType;

export type CustomTag<T extends ValidTag> = PropsWithChildren<
  {
    tag?: T;
  } & ComponentPropsWithoutRef<T>
>;

export type PropsForViews<T = unknown> = T &
  Pick<Content, 'slug'> & {
    increment?: boolean;
  };
