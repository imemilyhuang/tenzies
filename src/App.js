import React from "react"
import Die from "./components/Die"
import Stats from "./components/Stats"
import Confetti from "react-confetti"
import { nanoid } from "nanoid"
import useWindowSize from 'react-use/lib/useWindowSize'

export default function App() {
  const [dice, setDice] = React.useState(newDice())
  const [tenzies, setTenzies] = React.useState(false)

  // sets number of rolls and record
  const [count, setCount] = React.useState(0)
  const [record, setRecord] = React.useState(0)
  const stats = [{name: "Rolls", number: count}, {name: "Record", number: record}]

  const { width, height } = useWindowSize()

  // use .useEffect() for localStorage and to keep two pieces 
  // of internal state (dice and tenzies) in sync
  React.useEffect(() => {
    localStorage.setItem("record", record)
    const checkHold = dice.filter(die => die.isHeld === false)
    const checkSameValues = dice.filter(die => dice[0].value !== die.value)
    if (checkHold.length === 0 && checkSameValues.length === 0) {
      setTenzies(true)
    }
  }, [dice])

  function randomValue() { // gets random value between 1-6
    return Math.ceil(Math.random() * 6)
  }

  function newDice() { // original dice when starting new game
    const generateValues = Array.from({length: 10}, () => randomValue())
    return generateValues.map(data => {
      return {value: data, isHeld: false, id: nanoid()}
    })
  }

  function rollDice() { // runs when the user clicks button
    if (tenzies === true) { // reset game
      setDice(newDice())
      setTenzies(false)

      // controls roll count and record
      record === 0 && setRecord(count)
      record > count && setRecord(count)
      setCount(0)

    } else { // randomizes dice values for die where isHeld === false
      setCount(prevCount => prevCount + 1)
      setDice(prevDice => prevDice.map(data => {
      return data.isHeld ? data : {value: randomValue(), isHeld: false, id: nanoid()}
      }))
    }
  }

  function holdDice(id) { // freezes die that the user clicks
    setDice(prevDice => prevDice.map(data => {
        return data.id === id ? {...data, isHeld: !data.isHeld} : data
      }))
  }

  // maps properties from dice array into the die component
  const diceElements = dice.map(data => (
    <Die 
      key={data.id} 
      value={data.value} 
      isHeld={data.isHeld} 
      holdDice={() => holdDice(data.id)} 
    />
  ))

  // maps properties from stats array into stats component
  const statElements = stats.map(data => (
    <Stats
      key={nanoid()}
      name={data.name}
      number={data.number}
    />
  ))

  return (
    <div>
      <main>
        <h1>Tenzies</h1>
        <p className="description">
          Click each die to freeze it at its current 
          value between rolls. Roll until all the dice are the same!
        </p>
        <div className="stats-container">
          {statElements}
        </div>
        <div className="dice-container">
          {diceElements}
        </div>
        <button onClick={rollDice} className="roll-button">
          {tenzies ? "Play Again" : "Roll"}
        </button>
        {tenzies && <Confetti width={width} height={height} />}
      </main>

      <footer>Made by Emily Huang 2022.</footer>
    </div>
  )
}
