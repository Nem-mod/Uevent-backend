export interface ICreateEvent {
  title: string;
  description: string;
  startTime: Date;
  duration: number;
  poster: string;
  organization: number;
  themes: number[];
  format: number;
}
