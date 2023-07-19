import { connect } from "react-redux"
import { postsApi } from "src/features/posts/postsApi"
import { useState } from "react"
import styles from "./Post.module.css"
import { QueryStatus } from "@reduxjs/toolkit/dist/query"

interface CreatePostPorps {
  onSubmit(message: string): void
  isFetching: boolean
  requestStatus: string
}
const CreatePost = (props: CreatePostPorps) => {
  const [message, setMessage] = useState("")
  return (
    <div>
      <div>Create a Post</div>
      <input
        placeholder="post text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.button} onClick={() => props.onSubmit(message)}>
        Submit
      </button>
      <div>POST query status: {props.requestStatus}</div>
    </div>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  const { status } = postsApi.endpoints.createPost.select({
    requestId: undefined,
    fixedCacheKey: "create-posts",
  })(state)
  const isFetching = status === QueryStatus.pending
  return {
    isFetching,
    requestStatus: status,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: (message: string) =>
    dispatch(
      postsApi.endpoints.createPost.initiate(message, {
        fixedCacheKey: "create-posts",
      }),
    ),
})

export const CreatePostContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePost)
