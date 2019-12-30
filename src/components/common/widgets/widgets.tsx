import React from 'react';
import { Loader, Icon, Popup } from 'semantic-ui-react';

export function LockSymbol({visibility}) {
  if (visibility===1) {
    return <Icon color='black' name="lock" />
  } else if (visibility===2) {
    return <Icon color='black'  name="user secret" />
  }
  return null;
}

export function Stars({numStars}) {
  var stars = null;
  if (numStars===0.5) {
    stars = <Icon color='black' name="star half" />;
  } else if (numStars===1.0) {
    stars = <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}><Icon color='black' name="star" /></div>;
  } else if (numStars===1.5) {
    stars = <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}><Icon color='black' name="star" /><Icon color='black' name="star half" /></div>;
  } else if (numStars===2.0) {
    stars = <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}><Icon color='black' name="star" /><Icon color='black' name="star" /></div>;
  } else if (numStars===2.5) {
    stars = <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}><Icon color='black' name="star" /><Icon color='black' name="star" /><Icon color='black' name="star half" /></div>;
  } else if (numStars===3.0) {
    stars = <div style={{whiteSpace: 'nowrap', display: 'inline-flex'}}><Icon color='black' name="star" /><Icon color='black' name="star" /><Icon color='black' name="star" /></div>;
  }
  if (stars) {
    return (
      <Popup
        trigger={stars}
        header="Guidelines"
        content={
          <div>
            <Icon name="star" /> Nice<br/>
            <Icon name="star" /><Icon name="star" /> Very nice<br/>
            <Icon name="star" /><Icon name="star" /><Icon name="star" /> Fantastic!
          </div>
        }
      />
    );
  }
  return null;
}

export function LoadingAndRestoreScroll() {
  window.scrollTo(0, 0);
  return <Loader active inline='centered' />;
}