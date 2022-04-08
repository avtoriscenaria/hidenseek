export { default } from './messages';

export const COLORS = ['red', 'yellow', 'green', 'blue', 'purple', 'black'];

export enum STATUSES {
  success = 'success',
  failure = 'failure',
  token_expiration = 'token_expiration',
  not_authorized = 'not_autorized',
}

export enum GAME_STATUSES {
  start = 'start',
  in_process = 'in_process',
  finished = 'finished',
  delete = 'delete',
}

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
