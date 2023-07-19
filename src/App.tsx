import { Counter } from "src/features/counter/Counter"
import { Posts } from "src/features/posts/Posts"
import { LazyPostForm } from "src/features/posts/LazyPost"
import { PostsContainer } from "src/features/posts/PostContainer"
import { CreatePostContainer } from "src/features/posts/CreatePostContainer"
import { DeletePostContainer } from "src/features/posts/DeletePostContainer"
import { PollingPosts } from "src/features/posts/PollingPosts"
import { CatFact } from "src/features/catFacts/CatFact"
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.app}>
      <div>
        <div className={styles.section}>
          <div className={styles["section-header"]}>Simple counter slice</div>
          <Counter />
        </div>
        <div className={styles.section}>
          <div className={styles["section-header"]}>
            Posts GET on mount (hooks)
          </div>
          <Posts />
          <b>Note one request across both instances!</b>
          <Posts />
        </div>
        <div className={styles.section}>
          <div className={styles["section-header"]}>Lazy GET query</div>
          <div className={styles.row}>
            <LazyPostForm />
            <LazyPostForm />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles["section-header"]}>GET With Container</div>
          <PostsContainer />
        </div>
        <div className={styles.section}>
          <div className={styles["section-header"]}>POST Posts</div>
          <CreatePostContainer />
        </div>
        <div className={styles.section}>
          <div className={styles["section-header"]}>DELETE Posts</div>
          <DeletePostContainer />
        </div>
        <div className={styles.section}>
          <div className={styles["section-header"]}>Polling</div>
          <PollingPosts />
        </div>
        <div className={styles.section}>
          <div className={styles["section-header"]}>Listener Middleware</div>
          <CatFact />
        </div>
      </div>
    </div>
  )
}

export default App
