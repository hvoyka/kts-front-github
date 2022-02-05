// Здесь необходимо продемонстрировать создание и использование GitHubStore

import {GetUserReposListParams} from 'store/GitHubStore/types';
import GitHubStore from '../store/GitHubStore/GitHubStore';

const gitHubStore = new GitHubStore();

const params: GetUserReposListParams = {
  username: 'hvoyka',
  direction: 'desc',
};

gitHubStore.getUserReposList(params).then((result) => {
  if (result.success) console.log(result);
});
