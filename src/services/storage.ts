import {MMKV} from 'react-native-mmkv';
import {device} from '../global/config';

class Storage {
  storage: MMKV;
  constructor(id: string, encryptionKey?: string) {
    this.storage = new MMKV({
      id,
      encryptionKey,
    });
  }

  set(key: string, value: any) {
    this.storage.set(key, JSON.stringify(value));
  }

  get(key: string) {
    const value: string | null = this.storage.getString(key) ?? null;
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }

  getMultiple(keys: string[]) {
    const values: any[] = [];
    for (const key of keys) {
      values.push(this.get(key));
    }
    return values;
  }

  // delete
  delete(key: string) {
    this.storage.delete(key);
  }

  deleteMultiple(keys: string[]) {
    const keysLength = keys?.length ?? 0;
    if (keysLength) {
      return;
    }
    for (const key of keys) {
      this.delete(key);
    }
  }

  clearAll() {
    this.storage.clearAll();
  }
}

const storage = new Storage(device.id, device.id);

export default storage;

export const storageKeys = {
  token: 'mmkv-user-token',
  loginToken: 'mmkv-user-LoginToken',
  selectedLanguage: 'selected-language',
  signInData: 'mmkv-user-signInData',
  loginType: 'mmkv-user-loginType',
  userId: 'mmkv-user-userId',
};

export function getToken() {
  return storage.get(storageKeys.token);
}
export function getLoginToken() {
  return storage.get(storageKeys.loginToken);
}
export function getSignInData() {
  return storage.get(storageKeys.signInData);
}
