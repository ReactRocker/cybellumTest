export interface IAuth {
  access_token: string | null;
  refresh_token: string | null;
  isAuthorized: boolean;
  loading: boolean;
  error: string | null;
}
export interface userToken {
  access_token: string,
  refresh_token: string
}
