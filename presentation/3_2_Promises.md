# Promises

Simple primitive for handling values that will be known in the future.

A proxy to a value that may be resolved in the future. E.g. a web request.

Available on all modern browsers (no IE 11)

Three states:
- Pending (e.g. waiting for the server response)
- Fulfilled (e.g. 200 OK response)
- Rejected (e.g. 400 response or connection timeout)


```js
const promise = new Promise((resolve, reject) =>
    setTimeout(
      () => resolve("some resolved value"),
      2000,
    ),
)
promise.then((message) => console.log(message))
console.log("Defined the promise")

// Console output:
// "Defined the promise"
// "some resolved value"
```


### Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://caniuse.com/?search=promises