export enum AppStep {
  WELCOME = 'WELCOME',
  VALENTINES_WEEK = 'VALENTINES_WEEK',
  MEMORIES = 'MEMORIES',
  REASONS = 'REASONS',
  AI_POEM = 'AI_POEM',
  THE_QUESTION = 'THE_QUESTION',
  SUCCESS = 'SUCCESS'
}

export interface Memory {
  id: number;
  imageUrl: string;
  caption: string;
}

export interface Reason {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface PoemParams {
  name: string;
  favoriteMemory: string;
  trait: string;
}