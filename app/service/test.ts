import { Service } from 'egg';

export default class NewsService extends Service {
  public async list(): Promise<NewsItem[]> {
    return [{ id: 1, title: '23' }];
  }
}

export interface NewsItem {
  id: number;
  title: string;
}
