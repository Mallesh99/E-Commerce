import React, { Component } from "react";

export class Circle extends Component {
  render() {
    return (
      <button
        className="active"
        style={{
          margin: 10,
          display: "inline-block",
          backgroundColor: this.props.bgColor,
          borderRadius: "50%",
          borderColor: "blue",
          width: 30,
          height: 30,
        }}
        onClick={() => {
          console.log("hi");
        }}
      ></button>
    );
  }
}

export default Circle;
