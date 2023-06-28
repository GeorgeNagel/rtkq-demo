import { useGetPostByIdQuery } from "src/features/posts/postsApi"
import { Post } from "src/features/posts/types"

const PostRow = ({ post: Post }) => {
  return (
    <div>
      {post.id}: {post.text}
    </div>
  )
}
export const Posts = () => {
  const { data, error, isLoading } = useGetPostByIdQuery("bulbasaur")

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Problemo</div>
  }
  return (
    <ul>
      {data.map((post) => (
        <PostRow post={post} key={post.id} />
      ))}
    </ul>
  )
}
