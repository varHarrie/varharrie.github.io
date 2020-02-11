import 'whatwg-fetch'
import config from '../config'

const base = 'https://api.github.com'

// const proxyBase = 'https://cors-anywhere.herokuapp.com'

// const authUrl = 'https://github.com/login/oauth/access_token'

// export function getAccessToken (code: string) {
//   return fetch(
//     `${proxyBase}/${authUrl}`,
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         code,
//         client_id: config.clientId,
//         client_secret: config.clientSecret
//       })
//     }
//   )
// }

export function getUser() {
  return fetch(
    `${base}/${config.username}`
  ).then((res) => res.json())
}

export function listLabels() {
  return fetch(
    `${base}/repos/${config.repo}/labels`
  ).then((res) => res.json())
}

export function getIssue(id: number) {
  return fetch(
    `${base}/repos/${config.repo}/issues/${id}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3.html'
      }
    }
  ).then((res) => res.json())
}

export function listIssues(page: number) {
  const query = `q=state:open+repo:${config.repo}+author:${config.username}&sort=created&order=desc&page=${page}&per_page=${config.pageSize}`

  return fetch(
    `${base}/search/issues?${query}`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3.html'
      }
    }
  ).then((res) => res.json())
}

export function listComments (number: number) {
  return fetch(
    `${base}/repos/${config.repo}/issues/${number}/comments`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3.html'
      }
    }
  ).then((res) => res.json())
}

// export function addComment (accessToken: string, number: number, content: string) {
//   return fetch(
//     `${base}/repos/${config.repo}/issues/${number}/comments`,
//     {
//       method: 'POST',
//       headers: {
//         Authorization: `token ${accessToken}`
//       },
//       body: JSON.stringify({
//         body: content
//       })
//     }
//   )
// }
