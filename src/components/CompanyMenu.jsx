import React from 'react';
import { Menu } from 'semantic-ui-react';
import appconfig from '../appconfig';

function CompanyMenu(props) {
  return (
    <Menu vertical pointing fluid>
      {Array.from(appconfig.companies.keys()).map(company => (
        <Menu.Item
          name={company}
          key={company}
          onClick={props.handleCompanyClick}
          active={props.activeCompany === company}
        />
      ))}
    </Menu>
  );
}

export default CompanyMenu;