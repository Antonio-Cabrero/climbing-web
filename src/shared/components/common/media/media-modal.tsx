import React from 'react';
import { Dimmer, Button, Icon, Image } from 'semantic-ui-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { getImageUrl } from '../../../api';
import ReactPlayer from 'react-player';
import Svg from './svg';

const style = {
  img: {
    maxHeight: '100vh',
    maxWidth: '100vw',
    objectFit: 'scale-down'
  },
  video: {
    maxHeight: '720px',
    maxWidth: '1280px'
  },
  buttonEdit: {
    zIndex: 2,
    position: 'fixed',
    top: '2px',
    left: '2px'
  },
  close: {
    zIndex: 2,
    position: 'fixed',
    top: '2px',
    right: '2px'
  },
  prev: {
    zIndex: 2,
    position: 'fixed',
    top: '50%',
    left: '2px',
    height: '40px',
    marginTop: '-20px' /* 1/2 the hight of the button */
  },
  next: {
    zIndex: 2,
    position: 'fixed',
    top: '50%',
    right: '2px',
    height: '40px',
    marginTop: '-20px' /* 1/2 the hight of the button */
  },
  play: {
    zIndex: 2,
    position: 'fixed',
    top: '50%',
    left: '50%',
    height: '60px',
    width: '60px',
    marginTop: '-30px', /* 1/2 the hight of the button */
    marginLeft: '-30px' /* 1/2 the width of the button */
  },
}

interface Props extends RouteComponentProps<any> {
  isAdmin: boolean,
  onClose: any,
  onDelete: any,
  m: Media,
  length: number,
  gotoPrev: any,
  gotoNext: any,
  playVideo: any
}
function MediaModal({isAdmin, onClose, onDelete, m, length, gotoPrev, gotoNext, playVideo, history}) {
  let myPlayer;
  var topLeftButton;
  if (isAdmin && m.idType===1) {
    if (m.svgProblemId>0) {
      topLeftButton = <Icon style={style.buttonEdit} size="large" color="red" name="edit" link onClick={() => history.push(`/problem/svg-edit/${m.svgProblemId}-${m.id}`)} />
    } else if (!m.svgs) {
      topLeftButton = <Icon style={style.buttonEdit} size="large" color="red" name="trash" link onClick={onDelete} />
    }
  }
  return (
    <Dimmer active={true} onClickOutside={onClose} page>
      {topLeftButton}
      <Icon style={style.close} size="big" name="close" link onClick={onClose} />
      {length > 1 &&
        <>
          <Icon style={style.prev} size="big" name="angle left" link onClick={gotoPrev} />
          <Icon style={style.next} size="big" name="angle right" link onClick={gotoNext} />
        </>
      }
      {m.idType===1?
        (m.svgs? <Image style={style.img}><Svg thumb={false} style={{}} m={m} close={onClose}/></Image> : <Image style={style.img} alt={m.description} src={getImageUrl(m.id, 720)} />)
      :
        (m.autoPlayVideo?
          <ReactPlayer
            style={style.video}
            ref={player => myPlayer = player }
            className='react-player'
            width='100%'
            height='100%'
            url={'https://buldreinfo.com/buldreinfo_media/mp4/' + (Math.floor(m.id/100)*100) + "/" + m.id + '.mp4'}
            controls={true}
            playing={true}
            onDuration={duration => myPlayer.seekTo(m.t/duration)}
          />
        :
          <>
            <Button size="massive" color="youtube" circular style={style.play} icon="play" onClick={playVideo} />
            <Image as="a" style={style.img} alt={m.description} src={getImageUrl(m.id)} />
          </>
        )
      }
    </Dimmer>
  )
}

// @ts-ignore TODO remove ignore when @types/React includes React 16.6
export default withRouter<Props>(React.memo(MediaModal))