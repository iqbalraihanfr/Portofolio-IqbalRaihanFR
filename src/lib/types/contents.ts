export interface Content {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  lastUpdatedAt?: string;
}

export interface Blog extends Content {
  // Add blog-specific fields here
}

export interface Project extends Content {
  // Add project-specific fields here
}

export type ContentType = 'blog' | 'projects';
