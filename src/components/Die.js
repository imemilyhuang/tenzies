import React from "react"

// die component
export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#1ab849" : "#ffffff",
        color: props.isHeld ? "#ffffff" : "#000000"
    }

    return (
        <div className="die" style={styles} onClick={props.holdDice}>
            <h2 className="die-number">{props.value}</h2>
        </div>
    )
}