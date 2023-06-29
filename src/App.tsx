import { Counter } from "src/features/counter/Counter"
import { Posts } from "src/features/posts/Posts"
import { LazyPostForm } from "src/features/posts/LazyPost"

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
        <LazyPostForm />
      </header>
    </div>
  )
}

export default App
