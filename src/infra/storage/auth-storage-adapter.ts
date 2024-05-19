import { StorageAdapter } from "./storage-adapter";

export class AuthStorageAdapter extends StorageAdapter {
  public static removeSessionToken() {
    this.removeItem(this.SESSION_KEY);
  }

  public static getSessionToken() {
    return this.getItem(this.SESSION_KEY);
  }

  public static updateSessionToken(token: string) {
    this.setItem(this.SESSION_KEY, token);
  }
}
