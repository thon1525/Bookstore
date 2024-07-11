import { repoBookstore } from "../databases/repositories/repoBookstore";

export class bookstoreServies {
  public async BookstoreGetView() {
    try {
      const ObjectrepoBookstore = new repoBookstore();
      const DataBooks = await ObjectrepoBookstore.GetAllBook();
      return DataBooks;
    } catch (error: unknown) {
      throw error;
    }
  }
}
