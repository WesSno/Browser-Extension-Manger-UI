import React from "react";

function Card(props) {
  return (
    <div
      className={`card ${props.theme} ${
        props.isAnimating ? "is-animating" : ""
      }`}
    >
      <img src={props.imgUrl} alt={`${props.name} logo`} className="card-img" />
      <h2 className={`title ${props.theme}`}>{props.name}</h2>
      <p className={`description ${props.theme}`}>{props.description}</p>

      {props.isRemoved ? (
        <button
          className={`remove-btn ${props.theme}`}
          onClick={props.onRestore}
          aria-label={`Restore ${props.name}`}
        >
          Restore
        </button>
      ) : (
        <button
          className={`remove-btn ${props.theme}`}
          onClick={props.onRemove}
          aria-label={`Remove ${props.name}`}
        >
          Remove
        </button>
      )}

      <label htmlFor={`toggle-${props.name}`} className="switch">
        <input
          id={`toggle-${props.name}`}
          type="checkbox"
          className="toggle-btn"
          checked={props.isActive}
          onChange={props.onToggle}
          disabled={props.isRemoved}
          aria-checked={props.isActive}
          aria-label={`Toggle ${props.name}`}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default React.memo(Card);
