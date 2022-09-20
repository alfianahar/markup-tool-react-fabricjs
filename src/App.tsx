import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const App = () => {
  const [canvas, setCanvas] = useState("");
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 400,
      width: 800,
      backgroundColor: "white",
    });

  const addLine = (canva) => {
    const line = new fabric.Line([0, 100, 200, 200], {
      left: 50,
      top: 50,
      strokeWidth: 5,
      stroke: "red",
    });
    canva.add(line);
    canva.renderAll();
  };

  const addSqu = (canva) => {
    const square = new fabric.Rect({
      left: 150,
      top: 50,
      height: 150,
      width: 150,
      fill: "gray",
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
      fill: "yellow",
    });
    canva.add(rect);
    canva.renderAll();
  };

  const addCir = (canva) => {
    const circle = new fabric.Circle({
      radius: 80,
      left: 350,
      top: 50,
      fill: "green",
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
      fill: "blue",
    });
    canva.add(triangle);
    canva.renderAll();
  };

  const del = () => {
    canvas.getActiveObjects().forEach((obj) => {
      canvas.remove(obj);
    });
    canvas.discardActiveObject().renderAll();
  };

  // const url =
  //   'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';

  const addImg = (e, url, canva) => {
    e.preventDefault();
    new fabric.Image.fromURL(url, (img) => {
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

  return (
    <div>
      <h1>Markup Tool - React + Fabric.js</h1>
      <button onClick={() => del()}>Delete</button>
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
            value={imgURL}
            onChange={(e) => setImgURL(e.target.value)}
          />
          <button type="submit">Add Image</button>
        </div>
      </form>
      <br />
      <canvas id="canvas"> </canvas>
    </div>
  );
};

export default App;
