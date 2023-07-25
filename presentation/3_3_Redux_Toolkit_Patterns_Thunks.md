# Redux Toolkit Patterns

## Thunks

Add async behavior via promise-based Thunks

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = { checklist: [], status: 'unrequested' }

export const laterAddTodo = createAsyncThunk(
  'todos/laterAdd',
  async (user, { rejectWithValue }) => {
    const message = await queryToGetMessageByUser(user);
    return {id: 1, message };
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    todoAdded(state, action) {
      const { id, text } = action.payload
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.todos.checklist.push({
        id,
        text,
        completed: false
      })
    },
    todoToggled(state, action) {
      // Look for the specific nested object to update.
      // In this case, `action.payload` is the default field in the action,
      // and can hold the `id` value - no need for `action.id` separately
      const matchingTodo = state.todos.checklist.find(todo => todo.id === action.payload)

      if (matchingTodo) {
        // Can directly "mutate" the nested object
        matchingTodo.completed = !matchingTodo.completed
      }
    }
  },
  extraReducers: (builder) => {
    // When our request is pending:
    builder.addCase(laterAddTodo.pending, (state, action) => {
      state.todos.status = 'pending';
    })
    // When our request is fulfilled:
    // - store the 'fulfilled' state
    // - and store the received payload as the data for the corresponding message
    builder.addCase(laterAddTodo.fulfilled, (state, action) => {
      state.todos.status = 'fulfilled';
      state.dataByName[action.meta.arg] = action.payload
    })
    // When our request is rejected:
    builder.addCase(laterAddTodo.rejected, (state, action) => {
      state.todos.status = 'rejected'
      const { id, message } = action.payload;
      state.todos.checklist.push({
        id,
        message,
        completed: false
      })
    })
  }
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
