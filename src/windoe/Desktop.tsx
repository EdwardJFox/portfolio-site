import React, { useState } from 'react';
import './Desktop.scss';
import Windoe from './Windoe';

interface DesktopProps {
  height: string;
  width: string;
  windoes: any;
  updateWindoes: any;
}

const Desktop: React.FC<DesktopProps> = (props) => {
  const [currentlyDragging, setCurrentlyDragging] = useState(0);
  const [draggingStartPosition, setDraggingStartPosition] = useState({ x: 0, y: 0 });
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });

  const [currentlyResizing, setCurrentlyResizing] = useState(0);
  const [resizingType, setResizingType] = useState('');
  const [resizingStartPosition, setResizingStartPosition] = useState({ x: 0, y: 0 });
  const [previousSize, setPreviousSize] = useState({ width: 0, height: 0 });

  function handleMouseDown(e: any, windoe: any) {
    setCurrentlyDragging(windoe.id);
    setDraggingStartPosition({ x: e.pageX, y: e.pageY });
    setPreviousPosition(windoe.position);
  }

  function handleMouseUp() {
    setCurrentlyDragging(0);
    setResizingType('');
  }

  function handleResizeClick(e: any, windoe: any, resizeType: string) {
    setResizingType(resizeType);
    setCurrentlyResizing(windoe.id);
    setResizingStartPosition({ x: e.pageX, y: e.pageY });
    setDraggingStartPosition({ x: e.pageX, y: e.pageY });
    setPreviousSize(windoe.size);
    setPreviousPosition(windoe.position);
  }

  function handleMouseMove(e: any) {
    if(currentlyDragging > 0) {
      let dragging = props.windoes.find((windoe: any) => windoe.id == currentlyDragging);
      let updatedPosition = { x: 0, y: 0 };
      updatedPosition.x = previousPosition.x + (e.pageX - draggingStartPosition.x);
      updatedPosition.y = previousPosition.y + (e.pageY - draggingStartPosition.y);
      dragging.position = updatedPosition;
      props.updateWindoes([dragging]);
    }
    if(currentlyResizing > 0) {
      let dragging = props.windoes.find((windoe: any) => windoe.id == currentlyResizing);
      let updatedSize = { width: dragging.size.width, height: dragging.size.height };
      let updatedPosition = { x: dragging.position.x, y: dragging.position.y };

      switch(resizingType){
        case 'top':
          updatedSize.height = previousSize.height + (previousPosition.y - e.pageY);
          updatedPosition.y = previousPosition.y + (e.pageY - draggingStartPosition.y);
          break;
        case 'bottom':
          updatedSize.height = e.pageY - dragging.position.y;
          break;
        case 'left':
          updatedSize.width = previousSize.width + (previousPosition.x - e.pageX);
          updatedPosition.x = previousPosition.x + (e.pageX - draggingStartPosition.x);
          break;
        case 'right':
          updatedSize.width = e.pageX - dragging.position.x;
          break;
      }
      dragging.size = updatedSize;
      dragging.position = updatedPosition;
      props.updateWindoes([dragging]);
    }
  }

  return (
    <div className="desktop" style={{ height: props.height, width: props.width }} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      { props.windoes && props.windoes.map(
        (windoe: any) => <Windoe
          windoe={windoe}
          handleToolbarClick={handleMouseDown}
          handleToolbarRelease={handleMouseUp}
          handleResizeClick={handleResizeClick} />
      )}
    </div>
  );
}

export default Desktop;
