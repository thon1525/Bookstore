export interface AuthType {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role?: "AUTHOR" | "USER";
}

export interface AuthorType {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: "AUTHOR" | "USER";
  firstname: string;
  lastname: string;
  date_birth: string;
  nationality: string;
  bio: string;
  picture: string;
}

export interface AuthBookType {
  id?: number;
  title: string;
  publication_date: Date;
  description: string;
  cover_image: string;
  price: number;
  category_name?: string;
}

export interface AuthorJwtType {
  author_id: number;
  author_role: string;
}

export interface viewBookType {
  ID: number;
  USERNAME: string;
  EMAIL: string;
  FIRSTNAME: string;
  LASTNAME: string;
  NATIONALITY: string;
  BIO: string;
  PICTURE: string;
  TITLE: string;
  PUBLICATION_DATE: Date;
  DESCRIPTION: string;
  COVER_IMAGE: string;
  PRICE: number;
  CATEGORY_NAME?: string;
}

export interface AuthOracle {
  USERNAME: string;
  EMAIL: string;
}
