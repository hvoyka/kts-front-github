import { BASE_URL } from "constant";

import { ApiStore } from "./ApiStore";

class RootStore {
  readonly api: ApiStore = new ApiStore(BASE_URL);
}

export default new RootStore();
