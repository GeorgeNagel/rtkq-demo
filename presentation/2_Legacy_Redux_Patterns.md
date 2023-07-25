
# Legacy Redux Patterns

Everything in separate files

```js
// actionTypes/todos.js
export const ADD_TODO = 'ADD_TODO';
```

```js
// actions/todos.js
import { ADD_TODO } from '../actionTypes/todos.js'

export const addTodo = (id, text) => ({
  type: ADD_TODO,
  text,
  id
})
```

```js
// reducers/todo.js
import { ADD_TODO } from '../actionTypes/todos.js'

const initialState = []

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return state.concat({
        id: action.id,
        text: action.text,
        completed: false
      })
    }
    default:
      return state
  }
}
```

```js
// selectors/todos.js

export const getTodos = (state) => state.todos;
```


### Sources

- https://redux.js.org/usage/migrating-to-modern-redux