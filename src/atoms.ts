export interface Post {
  _id: string;
  title: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  contentHtml: string;
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
        posts: Post;
        comments: Comment[];
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
