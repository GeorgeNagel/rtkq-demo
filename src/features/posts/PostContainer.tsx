import { connect } from "react-redux"
import { Post } from "src/features/posts/types"
import { postsApi } from "src/features/posts/postsApi"
import { QueryStatus } from "@reduxjs/toolkit/dist/query"

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

interface PostsProps {
  posts: Post[]
  isFetching: boolean
  error: any
  fetchPosts(): void
  requestStatus: string
}

const Posts = (props: PostsProps) => {
  if (props.isFetching) {
    return <div>Loading...</div>
  }
  if (props.error) {
    return <div>Problemo</div>
  }
  return (
    <div>
      Posts
      <ul>
        {props.posts.map((post) => (
          <PostRow post={post} key={post.id} />
        ))}
      </ul>
      <button onClick={props.fetchPosts}>Fetch</button>
      <div>GET request status: {props.requestStatus}</div>
    </div>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  const { data, status } = postsApi.endpoints.getPosts.select()(state)
  const isFetching = status === QueryStatus.pending
  return {
    posts: data || [],
    isFetching,
    requestStatus: status,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchPosts: () =>
    dispatch(
      postsApi.endpoints.getPosts.initiate(undefined, { forceRefetch: true }),
    ),
})

export const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts)
