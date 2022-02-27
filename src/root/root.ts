import { GitHubStore, GetOrganizationReposListParams } from "store/GitHubStore";

const gitHubStore = new GitHubStore();

const orgParams: GetOrganizationReposListParams = {
  org: "ktsstudio",
  direction: "desc",
};

gitHubStore.getOrganizationReposList(orgParams).then((response) => {
  if (response.success) {
  }
});
