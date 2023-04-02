export interface IPost {
  id: string;
  avatar: string;
  name: string;
  postedDate: Date;
  type: string;
  photos: Array<string>;
  content: string;
  tags: Array<string>;
}
