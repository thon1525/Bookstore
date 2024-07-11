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

export interface AuthorType {
  isAuthor?: boolean;
  errors?: string;
  data: viewBookType | null;
}
