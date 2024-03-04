import React, { Component } from "react";

export class Circle extends Component {
  render() {
    var circleStyle = {
      margin: 10,
      display: "inline-block",
      backgroundColor: this.props.bgColor,
      borderRadius: "50%",
      width: 30,
      height: 30,
    };
    return (
      <div
        style={circleStyle}
        onClick={() => {
          console.log("hi");
        }}
      ></div>
    );
  }
}

export default Circle;
