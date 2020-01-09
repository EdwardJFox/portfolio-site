import React, { useState, useRef } from 'react';
import './Desktop.scss';
import Windoe from './Windoe';
import Icon from './Icon';
import About from '../pages/About';
import PreviousWork from '../pages/PreviousWork';
import Links from '../pages/Links';

interface DesktopProps {
  height: string;
  width: string;
}

const Desktop: React.FC<DesktopProps> = (props) => {
  const [windoes, setWindoes] = useState([]);
  const desktopRef = useRef(null);

  function handleFocus(windoeType: string) {
    const windoeIndex = getWindoeIndex(windoeType);
    if(windoeIndex >= 0) {
      let updatedWindoes = [ ...windoes ];
      updatedWindoes.splice(windoeIndex, 1);
      updatedWindoes.push(windoeType);
      setWindoes(updatedWindoes);
    }
  }

  function handleIconClick(windoeType: string) {
    const windoeIndex = getWindoeIndex(windoeType);
    if(windoeIndex === -1) {
      let updatedWindoes = [ ...windoes ];
      updatedWindoes.push(windoeType)
      setWindoes(updatedWindoes);
    }
  }

  function handleWindoeClose(windoeType: string) {
    const windoeIndex = getWindoeIndex(windoeType);
    if(windoeIndex >= 0) {
      let updatedWindoes = [ ...windoes ];
      updatedWindoes.splice(windoeIndex, 1);
      setWindoes(updatedWindoes);
    }
  }

  function getWindoeIndex(windoeType: string) {
    return windoes.indexOf(windoeType);
  }

  return (
    <div className="desktop" style={{ height: props.height, width: props.width }} ref={desktopRef}>
      <Icon position={{ x: 10, y: 10 }} icon={`${process.env.PUBLIC_URL}/images/icon_user.png`} title="About" handleOnClick={() => handleIconClick('about')} />
      <Icon position={{ x: 10, y: 90 }} icon="missing" title="previous_work" handleOnClick={() => handleIconClick('previous_work')} />
      <Icon position={{ x: 10, y: 190 }} icon={`${process.env.PUBLIC_URL}/images/icon_links.png`} title="Links" handleOnClick={() => handleIconClick('links')} />
      { windoes && windoes.map(
        (windoeType: any) => <Windoe
          windoeType={windoeType}
          handleFocus={handleFocus}
          handleClose={handleWindoeClose}
          desktopRef={desktopRef}
          key={windoeType}>
            { windoeContent()[windoeType]() }
          </Windoe>
      )}
    </div>
  );
}

export default Desktop;

function windoeContent(): any {
  return {
    about: function() {
      return (<About />)
    },
    previous_work: function() {
      return (<PreviousWork />)
    },
    links: function() {
      return (<Links />)
    }
  }
}