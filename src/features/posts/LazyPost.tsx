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
  const [preferCache, setPreferCache] = useState(false)

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
    trigger(parseInt(id), preferCache)
  }
  return (
    <div>
      {maybeRenderLazyPost()}
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <div>Post Id</div>
          <input value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <label>
          <div>Prefer Cache?</div>
          <input
            type="checkbox"
            checked={preferCache}
            onChange={(e) => {
              setPreferCache(!preferCache)
            }}
          />
        </label>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}
