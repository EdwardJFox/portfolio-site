import React, { useState } from 'react';
import './Desktop.scss';
import Windoe from './Windoe';
import Icon from './Icon';

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
    setDraggingStartPosition({ x: e.pageX, y: e.pageY });
    setPreviousSize(windoe.size);
    setPreviousPosition(windoe.position);
  }

  function handleMouseMove(e: any) {
    if(currentlyDragging > 0) {
      handleDragging(e);
    }
    if(currentlyResizing > 0) {
      handleResize(e);
    }
  }

  function handleDragging(e: any) {
    let dragging = props.windoes.find((windoe: any) => windoe.id == currentlyDragging);
    let updatedPosition = { x: 0, y: 0 };
    updatedPosition.x = previousPosition.x + (e.pageX - draggingStartPosition.x);
    updatedPosition.y = previousPosition.y + (e.pageY - draggingStartPosition.y);
    dragging.position = updatedPosition;
    updateWindoeInState(dragging);
  }

  function handleResize(e: any) {
    let resizing = props.windoes.find((windoe: any) => windoe.id == currentlyResizing);
    let updatedSize = { width: resizing.size.width, height: resizing.size.height };
    let updatedPosition = { x: resizing.position.x, y: resizing.position.y };

    switch(resizingType){
      case 'top':
        updatedSize.height = previousSize.height + (previousPosition.y - e.pageY);
        updatedPosition.y = previousPosition.y + (e.pageY - draggingStartPosition.y);
        break;
      case 'bottom':
        updatedSize.height = e.pageY - resizing.position.y;
        break;
      case 'left':
        updatedSize.width = previousSize.width + (previousPosition.x - e.pageX);
        updatedPosition.x = previousPosition.x + (e.pageX - draggingStartPosition.x);
        break;
      case 'right':
        updatedSize.width = e.pageX - resizing.position.x;
        break;
    }
    resizing.size = updatedSize;
    resizing.position = updatedPosition;

    updateWindoeInState(resizing);
  }

  function handleFocus(e: any, windoe: any) {
    const windoeIndex = props.windoes.indexOf(windoe);
    if(windoeIndex > 0) {
      let updatedWindoes = [ ...props.windoes ];
      updatedWindoes.splice(windoeIndex, 1);
      updatedWindoes.push(windoe);
      props.updateWindoes(updatedWindoes);
    }
  }

  function updateWindoeInState(windoe: any) {
    const windoeIndex = props.windoes.indexOf(windoe);
    let updatedWindoes = [ ...props.windoes ];
    updatedWindoes[windoeIndex] = windoe;
    props.updateWindoes(updatedWindoes);
  }

  function handleIconClick(windoeType: string) {
    const selectedWindow = props.windoes.find((windoe: any) => windoe.type == windoeType);
    const windoeIndex = props.windoes.indexOf(selectedWindow);
    let updatedWindoes = [ ...props.windoes ];
    updatedWindoes[windoeIndex].state = "opened";
    props.updateWindoes(updatedWindoes);
  }

  function handleWindoeClose(windoeType: any) {
    const selectedWindow = props.windoes.find((windoe: any) => windoe.type == windoeType);
    const windoeIndex = props.windoes.indexOf(selectedWindow);
    let updatedWindoes = [ ...props.windoes ];
    updatedWindoes[windoeIndex].state = "closed";
    props.updateWindoes(updatedWindoes);
  }

  return (
    <div className="desktop" style={{ height: props.height, width: props.width }} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <Icon position={{ x: 10, y: 10 }} icon={`${process.env.PUBLIC_URL}/images/icon_user.png`} title="About" handleOnClick={() => handleIconClick('about')} />
      <Icon position={{ x: 10, y: 90 }} icon="missing" title="previous_work" handleOnClick={() => handleIconClick('previous_work')} />
      <Icon position={{ x: 10, y: 190 }} icon={`${process.env.PUBLIC_URL}/images/icon_links.png`} title="Links" handleOnClick={() => handleIconClick('links')} />
      { props.windoes && props.windoes.map(
        (windoe: any) => windoe.state === 'opened' && <Windoe
          windoe={windoe}
          handleToolbarClick={handleMouseDown}
          handleToolbarRelease={handleMouseUp}
          handleResizeClick={handleResizeClick}
          handleFocus={handleFocus}
          handleWindoeClose={handleWindoeClose} />
      )}
    </div>
  );
}

export default Desktop;
