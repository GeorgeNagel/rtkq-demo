import { useSelector } from "react-redux"
import { useLazyGetRandomFactQuery } from "./catFactsAPI"
import {
  selectFactHasLetterE,
  selectFactRequestSuccesses,
  selectPerformingExpensiveCalculation,
} from "./catFactsSlice"

export const CatFact = () => {
  const [trigger, { data, error, isLoading }] = useLazyGetRandomFactQuery()
  const successes = useSelector(selectFactRequestSuccesses)
  const factHasLetterE = useSelector(selectFactHasLetterE)
  const performingExpensiveCalculation = useSelector(
    selectPerformingExpensiveCalculation,
  )
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Problemo</div>
  }

  return (
    <div>
      <div>Cat fact: {data?.text}</div>
      <button onClick={() => trigger()}>Fetch</button>
      <div>Request successes: {successes}</div>
      <div>
        Fact has letter 'E':{" "}
        {performingExpensiveCalculation
          ? "..."
          : factHasLetterE
          ? "Yes!"
          : "No!"}
      </div>
    </div>
  )
}
