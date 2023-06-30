import { Counter } from "src/features/counter/Counter"
import { Posts } from "src/features/posts/Posts"
import { LazyPostForm } from "src/features/posts/LazyPost"
import { PostsContainer } from "src/features/posts/PostContainer"
import { CreatePostContainer } from "src/features/posts/CreatePostContainer"
import { DeletePostContainer } from "src/features/posts/DeletePostContainer"
import { PollingPosts } from "src/features/posts/PollingPosts"
import styles from "./App.module.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Slice</h1>
        <Counter />
        <hr />
        <h1>Posts loaded on mount</h1>
        <Posts />
        <b>Note one request across both instances:</b>
        <Posts />
        <hr />
        <h1>Lazy query</h1>
        <div className={styles.row}>
          <LazyPostForm />
          <LazyPostForm />
        </div>
        <hr />
        <h1>With Container</h1>
        <PostsContainer />
        <hr />
        <h1>POST Posts</h1>
        <CreatePostContainer />
        <hr />
        <h1>DELETE Posts</h1>
        <DeletePostContainer />
        <hr />
        <h1>Polling</h1>
        <PollingPosts />
      </header>
    </div>
  )
}

export default App
