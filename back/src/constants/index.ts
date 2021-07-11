export const MONGO_URI =
  'mongodb+srv://worker:Cp5DVYB9Ebropwab@cluster0.cjqvi.mongodb.net/HNS?retryWrites=true&w=majority';

export const SECRET = 'BlAGo_y31L0w_Br1cK';
export const EXPIRATION_JWT = '6h';

export enum STATUSES {
  success = 'success',
  failure = 'failure',
  token_expiration = 'token_expiration',
  not_autorized = 'not_autorized',
}
