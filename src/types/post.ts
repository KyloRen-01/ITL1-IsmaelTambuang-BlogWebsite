export interface Post {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  news_link?: string | null;
  type: "article" | "news";
  images: string[];
  is_hidden: boolean;
  author_id: string | null;
  users?: {
    name?: string | null;
    email?: string | null;
    avatar_url?: string | null;
  } | null;
  slug: string;
  reading_time: number;
  excerpt: string;
}

export type PostFilter = "all" | "article" | "news";

export interface AppView {
  page: "home" | "post" | "dashboard" | "editor";
  postId?: string;
  editPostId?: string;
}
