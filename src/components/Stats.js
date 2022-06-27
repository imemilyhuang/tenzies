import React from "react"

export default function Stats(props) {
    return (
        <div className="stat-box">
            <h3>{props.name}</h3>
            <p>{props.number}</p>
        </div>
    )
}