export interface BlogPost {
  title: string;
  content: string;
  date: string;
  sentiment?: 'positive' | 'negative';
}
