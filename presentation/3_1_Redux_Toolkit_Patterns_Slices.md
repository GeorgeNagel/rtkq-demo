# Redux Toolkit Patterns

- Centralized state structure and logic
- Reduced boilerplate, automatic action creators
- Automatic handling of immutability


## Slices

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    todoAdded(state, action) {
      const { id, text } = action.payload
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.todos.push({
        id,
        text,
        completed: false
      })
    },
    todoToggled(state, action) {
      // Look for the specific nested object to update.
      // In this case, `action.payload` is the default field in the action,
      // and can hold the `id` value - no need for `action.id` separately
      const matchingTodo = state.todos.find(todo => todo.id === action.payload)

      if (matchingTodo) {
        // Can directly "mutate" the nested object
        matchingTodo.completed = !matchingTodo.completed
      }
    }
  },
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { todoAdded, todoToggled } = todosSlice.actions

// Export the slice reducer as the default export
export default todosSlice.reducer

export const selectTodos = (state) => state.todos;
```

### Sources

-   https://redux.js.org/usage/migrating-to-modern-redux
-   https://redux-toolkit.js.org/rtk-query/usage/migrating-to-rtk-query#implementation-using-createslice--createasyncthunk
