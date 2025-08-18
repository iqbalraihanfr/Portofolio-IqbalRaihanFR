export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  tags?: string[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
}
