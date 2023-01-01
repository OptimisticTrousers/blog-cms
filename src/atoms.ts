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
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  _id: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
}
export interface Comment {
  _id: string;
  name: string;
  email: string;
  postId: string;
  contentHtml: string;
  createdAt: string;
  updatedAt: string;
}

export interface FetchTag {
  loading: boolean | undefined;
  error: string | undefined;
  value: { tag: Tag } | undefined;
}

export interface FetchTags {
  loading: boolean | undefined;
  error: string | undefined;
  value: { tags: Tag[] } | undefined;
}

export interface FetchCategories {
  loading: boolean | undefined;
  error: string | undefined;
  value: { categories: Category[] } | undefined;
}

export interface FetchCategory {
  loading: boolean | undefined;
  error: string | undefined;
  value: { category: Category } | undefined;
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

export interface UserTag {
  name: string;
}

export interface UserCategory {
  name: string;
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

export interface UserPost {
  title: string;
  contentHtml: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}
