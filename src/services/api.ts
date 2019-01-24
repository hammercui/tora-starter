import request from '../utils/request';

export function fetchGithub(data?) {
	return request('https://api.github.com/users/octocat',data);
}
