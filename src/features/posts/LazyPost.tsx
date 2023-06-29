import React, { useState } from "react"
import { useLazyGetPostByIdQuery } from "src/features/posts/postsApi"
import { Post } from "src/features/posts/types"

type LazyPostProps = {
  post: Post
}

const LazyPost = (props: LazyPostProps) => (
  <div>
    {props.post.id}. {props.post.text}
  </div>
)

export const LazyPostForm = () => {
  const [trigger, { data, isFetching, error }, lastPromiseInfo] =
    useLazyGetPostByIdQuery()

  const [id, setId] = useState("0")

  const maybeRenderLazyPost = () => {
    if (isFetching) {
      return <div>Loading...</div>
    }
    if (error) {
      return <div>Problemo</div>
    }
    if (data) {
      return <LazyPost post={data} />
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const preferCache = false
    trigger(parseInt(id), preferCache)
  }
  return (
    <div>
      {maybeRenderLazyPost()}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input value={id} onChange={(e) => setId(e.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  )
}
