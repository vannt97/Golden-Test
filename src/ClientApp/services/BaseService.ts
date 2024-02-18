import { resolve } from "../../../webpack.config";
import { API_URL } from "../../GLOBAL_CONFIG";
import { linkUrl, shareFB } from "../utils/main-util";
import { DataResponse } from "./Type";

export default class BaseService {
  private static _instance: BaseService;
  public static get Instance(): BaseService {
    if (this._instance == null || this._instance != undefined) {
      this._instance = new BaseService();
    }
    return this._instance;
  }

  private async get(url: string): Promise<DataResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${linkUrl()}${url}`, { method: "GET" })
        .then((response: any) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          resolve(error);
        });
    });
  }

  private async post(url: string, body: FormData): Promise<DataResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${linkUrl()}${url}`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: body,
      })
        .then((response: any) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          resolve(error);
        });
    });
  }

  checkUUID(uuid: string) {
    return this.get("get-user-by-uuid?uuid=" + uuid);
  }

  submitARImage(value: FormData) {
    let data: any = this.post("submit-ar", value);
    
    return data;
  }
}
