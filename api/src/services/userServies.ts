import { RepoUser } from "../databases/repositories/repoUser";

export class UserServies {
  public async GetServiesUsers() {
    try {
      const objectRepoUser = new RepoUser();
      const dataUser = await objectRepoUser.GetAll();
      return dataUser;
    } catch (error: unknown) {
      throw error;
    }
  }
}
