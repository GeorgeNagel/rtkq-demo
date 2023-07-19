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
export const Posts = () => {
  const { data, error, isLoading } = useGetPostsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Problemo</div>
  }
  return (
    <div>
      Posts loaded on mount via hooks
      <ul>
        {data?.map((post) => (
          <PostRow post={post} key={post.id} />
        ))}
      </ul>
    </div>
  )
}
