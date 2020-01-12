import React, { useState, useEffect } from 'react';
import './Windoe.scss';

export interface WindoeProps {
  windoeType: any;
  handleFocus: any;
  handleClose: any;
  desktopRef: any;
}

const Windoe: React.FC<WindoeProps> = (props) => {
  const [position, setPosition] = useState({ x: 200, y: 150 });
  const [size, setSize] = useState({ width: 600, height: 450 });
  
  const beingDraggedRef = React.useRef(false);
  const beingResizedRef = React.useRef(false);
  const resizeTypeRef = React.useRef('');
  const draggingStartPositionRef = React.useRef({ x: 0, y: 0 });
  const previousPositionRef = React.useRef(position);
  const previousSizeRef = React.useRef({ width: 0, height: 0 });

  const handleMouseMove = (e: any) =>{
    if(beingDraggedRef.current) {
      handleDragging({ pageX: e.pageX, pageY: e.pageY });
    } else if(beingResizedRef.current) {
      handleResize({ pageX: e.pageX, pageY: e.pageY });
    }
  }

  const handleTouchMove = (e: any) =>{
    if(beingDraggedRef.current) {
      handleDragging({ pageX: e.changedTouches[0].pageX, pageY: e.changedTouches[0].pageY });
    } else if(beingResizedRef.current) {
      handleResize({ pageX: e.changedTouches[0].pageX, pageY: e.changedTouches[0].pageY });
    }
  }

  function handleToolbarClick(e: any) {
    beingDraggedRef.current = true;
    draggingStartPositionRef.current = ({ x: e.pageX, y: e.pageY });
    previousPositionRef.current = position;
  }

  function handleToolbarTouch(e: any) {
    beingDraggedRef.current = true;
    draggingStartPositionRef.current = ({ x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY });
    previousPositionRef.current = position;
  }

  function handleResizeClick(e: any, resizeType: string) {
    beingResizedRef.current = true;
    resizeTypeRef.current = resizeType;
    draggingStartPositionRef.current = ({ x: e.pageX, y: e.pageY });
    previousSizeRef.current = size;
    previousPositionRef.current = position;
  }

  function handleResizeTouch(e: any, resizeType: string) {
    beingResizedRef.current = true;
    resizeTypeRef.current = resizeType;
    draggingStartPositionRef.current = ({ x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY });
    previousSizeRef.current = size;
    previousPositionRef.current = position;
  }

  function handleToolbarRelease() {
    beingDraggedRef.current = false;
    beingResizedRef.current = false;
  }

  function handleDragging(e: any) {
    let updatedPosition = { ...position };

    updatedPosition.x = previousPositionRef.current.x + (e.pageX - draggingStartPositionRef.current.x);
    updatedPosition.y = previousPositionRef.current.y + (e.pageY - draggingStartPositionRef.current.y);
    setPosition(updatedPosition);
  }

  function handleResize(e: any) {
  let updatedSize = { ...size };
    let updatedPosition = { ...position };

    switch(resizeTypeRef.current){
      case 'top':
        updatedSize.height = previousSizeRef.current.height + (previousPositionRef.current.y - e.pageY);
        updatedPosition.y = previousPositionRef.current.y + (e.pageY - draggingStartPositionRef.current.y);
        break;
      case 'bottom':
        updatedSize.height = e.pageY - position.y;
        break;
      case 'left':
        updatedSize.width = previousSizeRef.current.width + (previousPositionRef.current.x - e.pageX);
        updatedPosition.x = previousPositionRef.current.x + (e.pageX - draggingStartPositionRef.current.x);
        break;
      case 'right':
        updatedSize.width = e.pageX - position.x;
        break;
    }

    setPosition(updatedPosition);
    setSize(updatedSize);
  }

  useEffect(() => {
    props.desktopRef.current.addEventListener('mousemove', handleMouseMove);
    props.desktopRef.current.addEventListener('mouseup', handleToolbarRelease);
    props.desktopRef.current.addEventListener('touchmove', handleTouchMove);
    props.desktopRef.current.addEventListener('touchend', handleToolbarRelease);

    return () => {
      props.desktopRef.current.removeEventListener('mousemove', handleMouseMove);
      props.desktopRef.current.removeEventListener('mouseup', handleToolbarRelease);
      props.desktopRef.current.removeEventListener('touchmove', handleTouchMove);
      props.desktopRef.current.removeEventListener('touchend', handleToolbarRelease);
    }
  }, [props.desktopRef, position, size]);

  return (
    <div className="windoe" style={{
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${size.width}px`,
      height: `${size.height}px` }}
      onMouseDown={() => props.handleFocus(props.windoeType)}
      onTouchStart={() => props.handleFocus(props.windoeType)}>

      <div className="windoeResize top" onMouseDown={(e) => handleResizeClick(e, 'top')} onTouchStart={(e) => handleResizeTouch(e, 'top')}></div>
      <div className="windoeResize bottom" onMouseDown={(e) => handleResizeClick(e, 'bottom')} onTouchStart={(e) => handleResizeTouch(e, 'bottom')}></div>
      <div className="windoeResize left" onMouseDown={(e) => handleResizeClick(e, 'left')} onTouchStart={(e) => handleResizeTouch(e, 'left')}></div>
      <div className="windoeResize right" onMouseDown={(e) => handleResizeClick(e, 'right')} onTouchStart={(e) => handleResizeTouch(e, 'right')}></div>

      <div className="windoeToolbar"
        onMouseDown={handleToolbarClick}
        onTouchStart={handleToolbarTouch}>
        <div className="windoeClose">
          <div className="windoeCloseButton"
            onMouseUp={() => props.handleClose(props.windoeType)}
            onTouchEnd={() => props.handleClose(props.windoeType)}>
              <div className="windoeCloseButtonInner"></div>
          </div>
        </div>
        <div className="windoeTitle"><span>{ props.windoeType }</span></div>
      </div>
      <div className="windoeContent">{ props.children }</div>
    </div>
  );
}

export default Windoe;
