export interface IPostBase {
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  author: object;
  comments: object;
  published: boolean;
  publishedAt: Date;
}

export interface PostData {
  title: string;
  content: string;
  coverImage: FileList | null;
}

export interface PostData {
  id?: string;
  title: string;
  content: string;
  coverImage: FileList | null;
}

export interface PostDisplayData {
  id: string;
  title: string;
  content: string;
  coverImage: string;
}