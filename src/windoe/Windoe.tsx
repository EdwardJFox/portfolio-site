import React, { useState } from 'react';
import './Windoe.scss';

export interface WindoeProps {
  windoe: any;
  handleToolbarClick: any;
  handleToolbarRelease: any;
  handleResizeClick: any;
}

const Windoe: React.FC<WindoeProps> = (props) => {
  return (
    <div className="windoe" style={{
      left: `${props.windoe.position.x}px`,
      top: `${props.windoe.position.y}px`,
      width: `${props.windoe.size.width}px`,
      height: `${props.windoe.size.height}px` }}>

      <div className="windoeResize top" onMouseDown={(e) => props.handleResizeClick(e, props.windoe, 'top')}></div>
      <div className="windoeResize bottom" onMouseDown={(e) => props.handleResizeClick(e, props.windoe, 'bottom')}></div>
      <div className="windoeResize left" onMouseDown={(e) => props.handleResizeClick(e, props.windoe, 'left')}></div>
      <div className="windoeResize right" onMouseDown={(e) => props.handleResizeClick(e, props.windoe, 'right')}></div>

      <div className="windoeToolbar"
        onMouseDown={(e) => props.handleToolbarClick(e, props.windoe)}
        onMouseUp={props.handleToolbarRelease}>Close</div>
      <div className="windoeContent">{ props.children }</div>
    </div>
  );
}

export default Windoe;
