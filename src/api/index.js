function api(url) {
  return `https://app.exunclan.com/api/v1/${url}`
}

async function fetchPosts() {
  const res = await fetch(api('posts'))
  const json = await res.json()
  return json.posts
}

export default {
  fetchPosts,
}
