import React, {useEffect, useRef} from 'react'
import {fabric} from 'fabric'

const FabricJSCanvas = () => {
  const canvasEl = useRef(null)
  useEffect(() => {
    const options = { ... };
    const canvas = new fabric.Canvas(canvasEl.current, options);
    // make the fabric.Canvas instance available to your app
    updateCanvasContext(canvas);
    return () => {
      updateCanvasContext(null);
      canvas.dispose()
    }
  }, []);

  return (<canvas width="300" height="300" ref={canvasEl}/>)
});
export default FabricJSCanvas;