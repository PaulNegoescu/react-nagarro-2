import { Fragment, useEffect, useState } from "react"

export function JsonPlaceholder() {
  const [posts, setPosts] = useState<[{title: string; id: number}] | null>(null);
  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);
  
  return (
    <>
      <h1>JsonPlaceholder</h1>
      {posts?.map(post => (
        <Fragment key={post.id}>
          <p>{post.title} !!</p>
        </Fragment>
      ))}
    </>
  )
}
