import { connect } from "react-redux"
import { postsApi } from "src/features/posts/postsApi"
import { useState } from "react"

interface CreatePostPorps {
  onSubmit(message: string): void
}
const CreatePost = (props: CreatePostPorps) => {
  const [message, setMessage] = useState("")
  return (
    <div>
      Create a Post
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => props.onSubmit(message)}>Submit</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: (message: string) =>
    dispatch(postsApi.endpoints.createPost.initiate(message)),
})

export const CreatePostContainer = connect(
  undefined,
  mapDispatchToProps,
)(CreatePost)
