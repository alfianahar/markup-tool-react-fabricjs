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

    const startDraw = (e) => {};

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

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const colorData = (data) => {
    setCol(data);
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-mono font-bold text-primary py-6">
        Drawing Tool - React + Fabric.js
      </h1>
      <div className="btn-group py-2">
        <button className="btn btn-sm btn-error" onClick={() => del()}>
          Delete
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => isDraw(canvas)}
        >
          Draw
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => addLine(canvas)}
        >
          Line
        </button>
        <button
          className="btn btn-sm btn-accent"
          onClick={() => addSqu(canvas)}
        >
          Square
        </button>
        <button
          className="btn btn-sm btn-accent"
          onClick={() => addRect(canvas)}
        >
          Rectangle
        </button>
        <button
          className="btn btn-sm btn-accent"
          onClick={() => addCir(canvas)}
        >
          Circle
        </button>
        <button
          className="btn btn-sm btn-accent"
          onClick={() => addTri(canvas)}
        >
          Triangle
        </button>
      </div>
      <div className="flex w-3/5 py-2 justify-center items-center">
        <form
          onSubmit={(e) => addImg(e, imgURL, canvas)}
          className="form-control w-3/4 mr-2"
        >
          <div className="input-group ">
            <input
              type="text"
              placeholder="Paste your image URL here"
              value={imgURL}
              className="input input-bordered w-full"
              onChange={(e) => setImgURL(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary">
              Add Image
            </button>
          </div>
        </form>
        <ColorPicker colorData={colorData} />
      </div>
      <div tabIndex={0} onKeyDown={handleKeyDown} className="p-2">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
};

export default App;
