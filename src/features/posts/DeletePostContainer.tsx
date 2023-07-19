import { connect } from "react-redux"
import { postsApi } from "src/features/posts/postsApi"
import { useState } from "react"
import styles from "./Post.module.css"

interface DeletePostPorps {
  onSubmit(id: number): void
  requestStatus: string
}
const DeletePost = (props: DeletePostPorps) => {
  const [id, setId] = useState(0)
  return (
    <div>
      <div>Delete a Post by id</div>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(parseInt(e.target.value))}
      />
      <button className={styles.button} onClick={() => props.onSubmit(id)}>
        Submit
      </button>
      <div>DELETE request status: {props.requestStatus}</div>
    </div>
  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  const { status } = postsApi.endpoints.deletePost.select({
    requestId: undefined,
    fixedCacheKey: "delete-posts",
  })(state)
  return {
    requestStatus: status,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onSubmit: (id: number) =>
    dispatch(
      postsApi.endpoints.deletePost.initiate(id, {
        fixedCacheKey: "delete-posts",
      }),
    ),
})

export const DeletePostContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeletePost)
