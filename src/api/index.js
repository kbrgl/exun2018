async function fetchPosts() {
  const res = await fetch('https://app.exunclan.com/api/v1/posts')
  const json = await res.json()
  return json.posts
}

export default {
  fetchPosts,
}
