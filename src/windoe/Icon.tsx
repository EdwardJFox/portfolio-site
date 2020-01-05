import React, { useState } from 'react';
import './Icon.scss';

export interface IconProps {
  position: any;
  icon: any;
  title: string;
  handleOnClick: any;
}

const Icon: React.FC<IconProps> = (props) => {
  return (
    <div className="icon" style={{
      left: `${props.position.x}px`,
      top: `${props.position.y}px` }}
      onClick={props.handleOnClick}>
      <img src={props.icon} />
      <div className="iconText">{ props.title }</div>
    </div>
  );
}

export default Icon;
