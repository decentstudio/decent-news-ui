import React from 'react';
import { Menu } from 'semantic-ui-react';

function PlatformMenu(props) {
  return (
    <Menu secondary>
      {props.platforms.map(platform => (
        <Menu.Item
          name={platform}
          key={platform}
          onClick={props.handlePlatformClick}
          active={props.activePlatform === platform}
        />
      ))}
    </Menu>
  );
}

export default PlatformMenu;