export interface UserType {
  username: string;
  email: string;
  password: string;
}

export interface typeOracle {
  USERNAME: string;
  EMAIL: string;
}
export interface authType {
  isAuth?: boolean;
  errors?: string;
  data: UserType | null;
}
