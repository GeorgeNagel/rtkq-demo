import { useState } from "react"
import { useGetPostsQuery } from "src/features/posts/postsApi"
import { Post } from "src/features/posts/types"

interface PostRowProps {
  post: Post
}

const PostRow = (props: PostRowProps) => {
  return (
    <div>
      {props.post.id}: {props.post.text}
    </div>
  )
}
export const PollingPosts = () => {
  // Automatically refetch every 3s
  const [poll, setPoll] = useState(false)
  const { data, isLoading, error } = useGetPostsQuery(undefined, {
    pollingInterval: poll ? 3000 : 0,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Problemo</div>
  }
  return (
    <div>
      Posts loaded by polling
      <ul>
        {data?.map((post) => (
          <PostRow post={post} key={post.id} />
        ))}
      </ul>
      <form>
        <label>
          <div>Enable Polling?</div>
          <input
            type="checkbox"
            checked={poll}
            onChange={() => setPoll(!poll)}
          />
        </label>
      </form>
    </div>
  )
}
