import React from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

function ShareButton({user, post: {id, shareCount, shares } }) {


  return (
    <MyPopup content="Share post">
          <Button labelPosition="right" onClick={toggle} >
            <Button color="purple" basic>
              <Icon name="share" />
            </Button>
            <Label basic color="purple" pointing="left">
              {shareCount}
            </Label>
          </Button>
    </MyPopup>
  );
}

export default ShareButton;
