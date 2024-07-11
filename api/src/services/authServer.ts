import { AuthType } from "../@types/AuthType";
import { RepoAuth } from "../databases/repositories/repoAuth";
import { generateSignature } from "../utils/jwt";

export class AuthServer {
  public async CreateData(data: AuthType) {
    const repoObject = new RepoAuth();
    try {
      const authServers = await repoObject.InsertData(data);
      const authid: any = authServers?.id;
      const role: any = authServers?.role;
      const jwtToken = await generateSignature({
        id: authid.toString(),
        role: role.toString(),
      });

      return jwtToken;
    } catch (error: unknown) {
      throw error;
    }
  }
}
