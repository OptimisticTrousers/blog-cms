import { ReactNode } from "react";

export interface Category {
  _id: string;
  name: string;
}

export interface Post {
  _id: string;
  title: string;
  contentHtml: string;
  published: boolean;
  image: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: string;
  };
  tags: [string];
  caption: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  _id: string;
  name: string;
}

export interface handleEditCategoriesFn {
  (values: UserCategory): Promise<void>;
}

export interface handleEditPostsFn {
  (values: FormData): Promise<void>;
}

export interface handleEditTagsFn {
  (values: UserTag): Promise<void>;
}

export interface CategoryAdminProps {
  category?: Category;
  deleteButton?: ReactNode;
  handleEditCategory?: handleEditCategoriesFn;
}

export interface PostAdminProps {
  post?: Post;
  deleteButton?: ReactNode;
  previewButton?: ReactNode;
  handleEditPost?: handleEditPostsFn;
}

export interface TagAdminProps {
  tag?: Tag;
  deleteButton?: ReactNode;
  handleEditTag?: handleEditTagsFn;
}

export interface FetchCategories {
  loading: boolean | undefined;
  error: string | undefined;
  value: { categories: Category[] } | undefined;
}

export interface FetchCategory {
  loading: boolean | undefined;
  error: string | undefined;
  value: { category: Category; posts: Post[] } | undefined;
}

export interface FetchPosts {
  loading: boolean | undefined;
  error: string | undefined;
  value:
    | {
        posts: Post[];
      }
    | undefined;
}

export interface FetchPost {
  loading: boolean | undefined;
  error: string | undefined;
  value:
    | {
        post: Post;
      }
    | undefined;
}

export interface FetchTags {
  loading: boolean | undefined;
  error: string | undefined;
  value: { tags: Tag[] } | undefined;
}

export interface FetchTag {
  loading: boolean | undefined;
  error: string | undefined;
  value: { tag: Tag; posts: Post[] } | undefined;
}

export interface UserTag {
  name: string;
}

export interface UserCategory {
  name: string;
}

export interface UserPost {
  title: string;
  contentHtml: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}
