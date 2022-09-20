"use strict";

import React, { useState } from "react";
import { ChromePicker } from "react-color";

const ColorPicker = ({ colorData }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [col, setCol] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  const [hexCol, setHexCol] = useState("#f17013");

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
    colorData(hexCol);
  };

  const handleChange = (color) => {
    setCol(color.rgb);
    setHexCol(color.hex);
    console.log();
  };

  const color = {
    width: "36px",
    height: "14px",
    borderRadius: "2px",
    background: `rgba(${col.r}, ${col.g}, ${col.b}, ${col.a})`,
  };
  const swatch = {
    padding: "5px",
    background: "#fff",
    borderRadius: "1px",
    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
    display: "inline-block",
    cursor: "pointer",
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  return (
    <div>
      <div style={swatch} onClick={handleClick}>
        <div style={color} value={hexCol} id="color-picker" />
      </div>
      {displayColorPicker ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <ChromePicker color={col} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
