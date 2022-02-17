import { GetOrganizationReposListParams } from "store/GitHubStore/types";

import GitHubStore from "../store/GitHubStore/GitHubStore";

const gitHubStore = new GitHubStore();

const orgParams: GetOrganizationReposListParams = {
  org: "ktsstudio",
  direction: "desc",
};

gitHubStore.getOrganizationReposList(orgParams).then((response) => {
  if (response.success) {
  }
});
