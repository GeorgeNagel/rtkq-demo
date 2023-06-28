import { Counter } from "src/features/counter/Counter"
import { Posts } from "src/features/posts/Posts"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Slice</h1>
        <Counter />
        <hr />
        <Posts />
      </header>
    </div>
  )
}

export default App
