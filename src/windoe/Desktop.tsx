import React, { useState, useRef } from 'react';
import './Desktop.scss';
import Windoe from './Windoe';
import Icon from './Icon';

interface DesktopProps {
  height: string;
  width: string;
}

const Desktop: React.FC<DesktopProps> = (props) => {
  const [windoes, setWindoes] = useState([]);
  const desktopRef = useRef(null);

  function handleFocus(e: any, windoe: any) {
    // const windoeIndex = props.windoes.indexOf(windoe);
    // if(windoeIndex > 0) {
    //   let updatedWindoes = [ ...props.windoes ];
    //   updatedWindoes.splice(windoeIndex, 1);
    //   updatedWindoes.push(windoe);
    //   props.updateWindoes(updatedWindoes);
    // }
  }

  function handleIconClick(windoeType: string) {
    let updatedWindoes = [...windoes];
    updatedWindoes.push({ windoeType })
    setWindoes(updatedWindoes);
  }

  function handleWindoeClose(windoeType: any) {
    // const selectedWindow = props.windoes.find((windoe: any) => windoe.type == windoeType);
    // const windoeIndex = props.windoes.indexOf(selectedWindow);
    // let updatedWindoes = [ ...props.windoes ];
    // updatedWindoes[windoeIndex].state = "closed";
    // props.updateWindoes(updatedWindoes);
  }

  return (
    <div className="desktop" style={{ height: props.height, width: props.width }} ref={desktopRef}>
      <Icon position={{ x: 10, y: 10 }} icon={`${process.env.PUBLIC_URL}/images/icon_user.png`} title="About" handleOnClick={() => handleIconClick('about')} />
      <Icon position={{ x: 10, y: 90 }} icon="missing" title="previous_work" handleOnClick={() => handleIconClick('previous_work')} />
      <Icon position={{ x: 10, y: 190 }} icon={`${process.env.PUBLIC_URL}/images/icon_links.png`} title="Links" handleOnClick={() => handleIconClick('links')} />
      { windoes && windoes.map(
        (windoe: any) => <Windoe
          windoe={windoe}
          handleFocus={handleFocus}
          handleClose={handleWindoeClose}
          desktopRef={desktopRef} />
      )}
    </div>
  );
}

export default Desktop;
