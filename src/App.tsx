import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import ColorPicker from "./ColorPicker";
import "./App.css";

const App = () => {
  const [canvas, setCanvas] = useState();
  const [imgURL, setImgURL] = useState("");
  const [col, setCol] = useState("#000");

  useEffect(() => {
    setCanvas(initCanvas("canvas"));
  }, []);

  const initCanvas = (id: string) =>
    new fabric.Canvas(id, {
      height: 400,
      width: 800,
      backgroundColor: "white",
    });

  const modes = {
    draw: "draw",
  };
  let currentMode = modes.draw;

  const isDraw = (canva) => {
    // console.log(currentMode);

    const startDraw = (e) => {
      // canva.isDrawingMode = true;
      // canva.renderAll;
    };

    const moveDraw = (e) => {
      if (currentMode !== modes.draw) {
        canva.isDrawingMode = true;
        canva.freeDrawingBrush.color = col;
        canva.freeDrawingBruash.width = 15;
        canva.renderAll;
      } else {
        canva.isDrawingMode = false;
      }
    };

    const stopDraw = (e) => {};

    if (currentMode === modes.draw) {
      currentMode = "";
      canva.isDrawingMode = false;
      canva.renderAll;
    } else {
      currentMode = modes.draw;
    }
    canva.on("mouse:down", startDraw);
    canva.on("mouse:move", moveDraw);
    canva.on("mouse:up", stopDraw);
  };
  // else {
  //   canva.isDrawingMode = false;
  //   canva.off("mouse:down", startDraw);
  //   canva.off("mouse:move", moveDraw);
  //   canva.off("mouse:up", stopDraw);
  // }

  const addLine = (canva) => {
    let line;
    let mouseDown = false;

    const startLine = (e) => {
      mouseDown = true;

      let pointer = canva.getPointer(e.e);

      line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
        strokeWidth: 5,
        stroke: col,
        selectable: true,
      });
      canva.selection = false;
      canva.add(line);
      canva.requestRenderAll();
    };

    const drawLine = (e) => {
      if (mouseDown === true) {
        let pointer = canva.getPointer(e.e);
        line.set({
          x2: pointer.x,
          y2: pointer.y,
        });

        canva.requestRenderAll();
        canva.setActiveObject(line);
      }
    };

    const stopLine = (e) => {
      line.setCoords();
      mouseDown = false;
      canva.selection = true;
      canva.off("mouse:down", startLine);
      canva.off("mouse:move", drawLine);
      canva.off("mouse:up", stopLine);
    };

    canva.on("mouse:down", startLine);
    canva.on("mouse:move", drawLine);
    canva.on("mouse:up", stopLine);
  };

  const addSqu = (canva) => {
    const square = new fabric.Rect({
      left: 150,
      top: 50,
      height: 150,
      width: 150,
      fill: col,
    });
    canva.add(square);
    canva.renderAll();
  };

  const addRect = (canva) => {
    const rect = new fabric.Rect({
      left: 250,
      top: 50,
      height: 100,
      width: 200,
      fill: col,
    });
    canva.add(rect);
    canva.renderAll();
  };

  const addCir = (canva) => {
    const circle = new fabric.Circle({
      radius: 80,
      left: 350,
      top: 50,
      fill: col,
    });
    canva.add(circle);
    canva.renderAll();
  };

  const addTri = (canva) => {
    const triangle = new fabric.Triangle({
      left: 450,
      top: 50,
      width: 170,
      height: 200,
      fill: col,
    });
    canva.add(triangle);
    canva.renderAll();
  };

  const del = () => {
    canvas.getActiveObjects().forEach((obj) => {
      // console.log(obj);
      canvas.remove(obj);
    });
    canvas.discardActiveObject().renderAll();
  };

  // const url =
  //   'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';

  const addImg = (e, url, canva) => {
    e.preventDefault();
    new fabric.Image.fromURL(url, () => {
      // img.scale(0.75);
      canva.renderAll();
      setBackground(imgURL, canva);
      setImgURL("");
    });
  };

  const setBackground = (imgURL, canvas) => {
    fabric.Image.fromURL(imgURL, (img) => {
      img.set({
        width: canvas.width,
        height: canvas.height,
        originX: "left",
        originY: "top",
      });
      canvas.backgroundImage = img;
      canvas.renderAll();
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 46) {
      del();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // const picker = document.getElementById("color-picker");

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
      // picker.addEventListener("change", handleChange);
    };
  }, []);

  const colorData = (data) => {
    setCol(data);
    console.log(data);
  };

  return (
    <div>
      <h1>Drawing Tool - React + Fabric.js</h1>
      <button onClick={() => del()}>Delete</button>
      <button onClick={() => isDraw(canvas)}>Draw</button>
      <button onClick={() => addLine(canvas)}>Line</button>
      <button onClick={() => addSqu(canvas)}>Square</button>
      <button onClick={() => addRect(canvas)}>Rectangle</button>
      <button onClick={() => addCir(canvas)}>Circle</button>
      <button onClick={() => addTri(canvas)}>Triangle</button>
      <br />
      <form onSubmit={(e) => addImg(e, imgURL, canvas)}>
        <div>
          <input
            type="text"
            placeholder="Paste your image URL here"
            value={imgURL}
            onChange={(e) => setImgURL(e.target.value)}
          />
          <button type="submit">Add Image</button>
        </div>
      </form>
      <ColorPicker colorData={colorData} />
      <br />
      <div tabIndex={0} onKeyDown={handleKeyDown}>
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
};

export default App;
