export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  cover_image: string;
  author: string;
  author_id: string;
  meta_description: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}
