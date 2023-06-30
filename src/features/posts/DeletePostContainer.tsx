import { connect } from "react-redux"
import { postsApi } from "src/features/posts/postsApi"
import { useState } from "react"

interface DeletePostPorps {
  onSubmit(id: number): void
}
const DeletePost = (props: DeletePostPorps) => {
  const [id, setId] = useState(0)
  return (
    <div>
      Delete a Post
      <input
        type="number"
        value={id}
        onChange={(e) => setId(parseInt(e.target.value))}
      />
      <button onClick={() => props.onSubmit(id)}>Submit</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: (id: number) =>
    dispatch(postsApi.endpoints.deletePost.initiate(id)),
})

export const DeletePostContainer = connect(
  undefined,
  mapDispatchToProps,
)(DeletePost)
