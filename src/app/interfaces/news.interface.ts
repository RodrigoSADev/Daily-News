export interface IMainNew {
  id: number;
  title: string;
  subtitle: string[];
  content: string;
  fullContent: string;
  date: string;
  publishedAt: string;
  author: string;
  category: string;
  image: string[];
  alt: string;
}

export interface IRecentNew {
  id: number;
  title: string;
  subtitle: string;
  fullContent: string;
  publishedAt: string;
  author: string;
  image: string;
  alt: string;
}

export interface IVariedNew {
  id: number;
  title: string;
  subtitle: string;
  fullContent: string;
  date: string;
  author: string;
  category: string;
  image: string;
  alt: string;
}
