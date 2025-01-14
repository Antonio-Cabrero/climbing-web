import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Leaflet from './common/leaflet/leaflet';
import { calculateDistance } from './common/leaflet/distance-math';
import Media from './common/media/media';
import { Button, Grid, Breadcrumb, Tab, Label, Icon, Comment, Header, Segment, Table, Feed, Image, Message } from 'semantic-ui-react';
import { Loading, LockSymbol, Stars, WeatherLabels } from './common/widgets/widgets';
import { useAuth0 } from '@auth0/auth0-react';
import { getAreaPdfUrl, getSectorPdfUrl, getProblemPdfUrl, getProblem, getSector, postComment, postTodo } from '../api';
import TickModal from './common/tick-modal/tick-modal';
import CommentModal from './common/comment-modal/comment-modal';
import Linkify from 'react-linkify';

const Problem = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [problemsOnRock, setProblemsOnRock] = useState([]);
  const [showTickModal, setShowTickModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(null);
  const [showHiddenMedia, setShowHiddenMedia] = useState(false);
  const [reload, setReload] = useState(true);
  let { problemId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (reload || (data != null && data.id!=problemId))) {
      const update = async() => {
        const accessToken = isAuthenticated? await getAccessTokenSilently() : null;
        getProblem(accessToken, parseInt(problemId), showHiddenMedia)
        .then((data) => {
          setProblemsOnRock([]);
          setData({...data, accessToken});
          setReload(false);
        })
        .catch(error => setError(error));
      }
      update();
    }
  }, [isLoading, isAuthenticated, problemId, reload]);

  useEffect(() => {
    if (data && data.rock) {
      getSector(data.accessToken, data.sectorId).then(sector => {
        if (sector.problems && sector.problems.length>0) {
          setProblemsOnRock(sector.problems.filter(p => p.rock && p.rock===data.rock));
        }
      });
    }
  }, [data]);

  function onRemoveMedia(idMediaToRemove) {
    let newMedia = data.media.filter(m => m.id!=idMediaToRemove);
    setData(prevState => ({ ...prevState, media: newMedia }));
  }

  function flagAsDangerous({ id, message }) {
    if (confirm('Are you sure you want to flag this comment?')) {
      setData(null);
      postComment(data.accessToken, id, data.id, message, true, false, false, [])
        .then((response) => {
          setReload(true);
        })
        .catch((error) => {
          console.warn(error);
          alert(error.toString());
        });
    }
  }

  function deleteComment({ id }) {
    if (confirm('Are you sure you want to delete this comment?')) {
      setData(null);
      postComment(data.accessToken, id, data.id, null, false, false, true, [])
        .then((response) => {
          setReload(true);
        })
        .catch((error) => {
          console.warn(error);
          alert(error.toString());
        });
    }
  }

  function toggleTodo(problemId : number) {
    setData(null);
    postTodo(data.accessToken, problemId)
    .then((response) => {
      setReload(true);
    })
    .catch((error) => {
      console.warn(error);
      alert(error.toString());
    });
  }

  function closeTickModalWithoutReload() {
    setShowTickModal(false);
  }

  function closeTickModalWithReload() {
    setShowTickModal(false);
    setReload(true);
  }

  function openTickModal() {
    setShowTickModal(true);
  }

  function closeCommentModalWithoutReload() {
    setShowCommentModal(null);
  }

  function closeCommentModalWithReload() {
    setShowCommentModal(null);
    setReload(true);
  }

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank">
      {text}
    </a>
  );

  if (error) {
    return <Message size="huge" style={{backgroundColor: "#FFF"}} icon="meh" header="404" content={error} />;
  }
  else if (!data || !data.id || reload) {
    return <Loading />;
  }
  let isBouldering = data.metadata.gradeSystem==='BOULDER';
  const markers = [];
  if (data.lat>0 && data.lng>0) {
    markers.push({
      lat: data.lat,
      lng: data.lng,
      label: data.name + ' [' + data.grade + ']',
      url: '/problem/' + data.id
    });
  }
  if (data.sectorLat>0 && data.sectorLng>0) {
    markers.push({
      lat: data.sectorLat,
      lng: data.sectorLng,
      url: '/sector/' + data.sectorId,
      isParking: true
    });
  }
  const panes = [];
  if (data.media && data.media.length>0) {
    panes.push({
      menuItem: { key: 'media', icon: 'image' },
      render: () =>
        <Tab.Pane>
          <Media isAdmin={data.metadata.isAdmin}
            numPitches={data.sections?.length || 0}
            removeMedia={onRemoveMedia}
            media={data.media}
            optProblemId={data.id}
            isBouldering={isBouldering} />
        </Tab.Pane>
    });
  }
  if (markers.length>0) {
    const polyline = data.sectorPolyline && data.sectorPolyline.split(";").filter(i => i).map(e => e.split(",").map(Number));
    let outlines;
    let polylines;
    if (data.sectorPolygonCoords && (data.lat===0 && data.lng===0)) {
      const polygon = data.sectorPolygonCoords.split(";").filter(i => i).map(c => {
        const latLng = c.split(",");
        return ([parseFloat(latLng[0]), parseFloat(latLng[1])]);
      });
      let label = data.sectorName + (polyline? " (" + calculateDistance(polyline) + ")" : "");
      outlines = [{url: '/sector/' + data.sectorId, label, polygon}];
    }
    if (polyline) {
      let label = outlines == null? calculateDistance(polyline) : null;
      polylines = [{polyline, label: label}];
    }
    panes.push({
      menuItem: { key: 'map', icon: 'map' },
      render: () => <Tab.Pane><Leaflet key={"sector="+data.id} autoZoom={true} height='40vh' markers={markers} outlines={outlines} polylines={polylines} defaultCenter={{lat: markers[0].lat, lng: markers[0].lng}} defaultZoom={16} navigate={navigate} onMouseClick={null} onMouseMove={null} showSateliteImage={true} clusterMarkers={false} rocks={null} flyToId={null} /></Tab.Pane>
    });
  }
  
  const ticks = (
    <Comment.Group as={Segment}>
      <Header as="h3" dividing>Ticks:</Header>
      {data.ticks?
        data.ticks.map((t, i) => {
          let dt = t.date;
          let com = null;
          if (t.repeats?.length>0) {
            dt = (dt? dt : "no-date") + ", " + t.repeats.map(x => x.date? x.date : "no-date").join(', ');
            com = (
              <Table compact unstackable size="small">
                <Table.Row>
                  <Table.Cell verticalAlign='top' singleLine className="metadata">{t.date? t.date : "no-date"}</Table.Cell>
                  <Table.Cell verticalAlign='top'>{t.comment}</Table.Cell>
                </Table.Row>
                {t.repeats.map((r, i) => (
                  <Table.Row key={i}>
                    <Table.Cell verticalAlign='top' singleLine className="metadata">{r.date? r.date : "no-date"}</Table.Cell>
                    <Table.Cell>{r.comment}</Table.Cell>
                  </Table.Row>
                ))}
              </Table>
            )
          }
          else {
            com = t.comment;
          }
          return (
            <Comment key={i}>
              <Comment.Avatar src={t.picture? t.picture : '/png/image.png'} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/user/${t.idUser}`}>{t.name}</Comment.Author>
                <Comment.Metadata>{dt}</Comment.Metadata>
                <Comment.Text><Stars numStars={t.stars} includeNoRating={true} /> {t.suggestedGrade}<br/><Linkify componentDecorator={componentDecorator}>{com}</Linkify></Comment.Text>
              </Comment.Content>
            </Comment>
          );
        })
      :
        <i>No ticks</i>
      }
    </Comment.Group>
  );
  const comments = (
    <Comment.Group as={Segment}>
      <Header as="h3" dividing>Comments:</Header>
      {data.comments?
        data.comments.map((c, i) => {
          var extra = null;
          if (c.danger) {
            extra = <Label color="red">Flagged as dangerous</Label>;
          } else if (c.resolved) {
            extra = <Label color="green">Flagged as safe</Label>
          } else if (data.metadata && data.metadata.isAuthenticated && data.metadata.gradeSystem==='CLIMBING') {
            extra = <Button basic size="tiny" compact onClick={() => flagAsDangerous(c)}>Flag as dangerous</Button>;
          }
          return (
            <Comment key={i}>
              <Comment.Avatar src={c.picture? c.picture : '/png/image.png'} />
              <Comment.Content>
                {c.editable &&
                  <Button.Group size="tiny" basic compact floated="right">
                    <Button onClick={() => setShowCommentModal(c)} icon="edit" />
                    <Button onClick={() => deleteComment(c)} icon="trash" />
                  </Button.Group>
                }
                <Comment.Author as={Link} to={`/user/${c.idUser}`}>{c.name}</Comment.Author>
                <Comment.Metadata>{c.date}</Comment.Metadata>
                <Comment.Text>
                  <Linkify componentDecorator={componentDecorator}>{c.message}</Linkify>
                  {c.media && c.media.length>0 && <Media isAdmin={data.metadata.isAdmin} numPitches={data.sections?.length || 0} removeMedia={() => window.location.reload()} media={c.media} optProblemId={null} isBouldering={isBouldering} />}
                </Comment.Text>
                {extra && <Comment.Actions>{extra}</Comment.Actions>}
              </Comment.Content>
            </Comment>
        )})
      :
        <i>No comments</i>
      }
    </Comment.Group>
  );
  
  var tickModal = null;
  if (showTickModal) {
    const enableTickRepeats = data.metadata.gradeSystem==='ICE' || (data.sections?.length>0);
    if (data.ticks) {
      const userTicks = data.ticks.filter(t => t.writable);
      if (userTicks && userTicks.length>0) {
        tickModal = <TickModal accessToken={data.accessToken} idTick={userTicks[0].id} idProblem={data.id} date={userTicks[0].date} comment={userTicks[0].comment} grade={userTicks[0].suggestedGrade} grades={data.metadata.grades} stars={userTicks[0].stars} repeats={userTicks[0].repeats} open={showTickModal} closeWithoutReload={closeTickModalWithoutReload} closeWithReload={closeTickModalWithReload} enableTickRepeats={enableTickRepeats} />
      }
    }
    if (!tickModal) {
      tickModal = <TickModal accessToken={data.accessToken} idTick={-1} idProblem={data.id} grade={data.originalGrade} grades={data.metadata.grades} open={showTickModal} closeWithoutReload={closeTickModalWithoutReload} closeWithReload={closeTickModalWithReload} comment={null} stars={null} repeats={null} date={null} enableTickRepeats={enableTickRepeats} />;
    }
  }
  let lat;
  let lng;
  if (data.lat>0 && data.lng>0) {
    lat = data.lat;
    lng = data.lng;
  } else if (data.sectorLat>0 && data.sectorLng>0) {
    lat = data.sectorLat;
    lng = data.sectorLng;
  }
  return (
    <>
      <Helmet>
        {data.metadata.canonical && <link rel="canonical" href={data.metadata.canonical} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data.metadata.jsonLd)}} />
        <title>{data.metadata.title}</title>
        <meta name="description" content={data.metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={data.metadata.description} />
        <meta property="og:url" content={data.metadata.og.url} />
        <meta property="og:title" content={data.metadata.title} />
        <meta property="og:image" content={data.metadata.og.image} />
        <meta property="og:image:width" content={data.metadata.og.imageWidth} />
        <meta property="og:image:height" content={data.metadata.og.imageHeight} />
        <meta property="fb:app_id" content={data.metadata.og.fbAppId} />
      </Helmet>
      {tickModal}
      <CommentModal accessToken={data.accessToken} open={showCommentModal? true : false} closeWithReload={closeCommentModalWithReload} closeWithoutReload={closeCommentModalWithoutReload} showHse={data.metadata.gradeSystem==='CLIMBING'}
        id={showCommentModal?.id} idProblem={data.id} initMessage={showCommentModal?.message} initDanger={showCommentModal?.danger} initResolved={showCommentModal?.resolved} />
      <div style={{marginBottom: '5px'}}>
        <div style={{float: 'right'}}>
          {data.metadata && data.metadata.isAuthenticated &&
            <Button.Group size="mini" compact>
              <Button positive={data.todo} animated='fade' onClick={() => toggleTodo(data.id)}>
                <Button.Content hidden>To-do</Button.Content>
                <Button.Content visible>
                  <Icon name='bookmark' />
                </Button.Content>
              </Button>
              <Button positive={data.ticks && data.ticks.filter(t => t.writable).length>0} animated='fade' onClick={openTickModal}>
                <Button.Content hidden>Tick</Button.Content>
                <Button.Content visible>
                  <Icon name='check' />
                </Button.Content>
              </Button>
              <Button animated='fade' onClick={() => setShowCommentModal({id: -1, idProblem: data.id, danger: false, resolved: false})}>
                <Button.Content hidden>Comment</Button.Content>
                <Button.Content visible>
                  <Icon name='comment' />
                </Button.Content>
              </Button>
              {data.metadata.isAdmin &&
                <Button positive={showHiddenMedia} animated='fade' onClick={() => {
                  setShowHiddenMedia(!showHiddenMedia);
                  setReload(true);
                }}>
                  <Button.Content hidden>Images</Button.Content>
                  <Button.Content visible>
                    <Icon name='eye' />
                  </Button.Content>
                </Button>
              }
              {data.metadata.isAdmin?
                <Button animated='fade' as={Link} to={`/problem/edit/${data.sectorId}-${data.id}`}>
                  <Button.Content hidden>Edit</Button.Content>
                  <Button.Content visible>
                    <Icon name='edit' />
                  </Button.Content>
                </Button>
              :
                <Button animated='fade' as={Link} to={`/problem/edit/media/${data.id}`}>
                  <Button.Content hidden>Image</Button.Content>
                  <Button.Content visible>
                    <Icon name='edit' />
                  </Button.Content>
                </Button>
              }
            </Button.Group>
          }
        </div>
        <Breadcrumb>
          <Breadcrumb.Section><Link to='/browse'>Browse</Link></Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section><Link to={`/area/${data.areaId}`}>{data.areaName}</Link> <LockSymbol lockedAdmin={data.areaLockedAdmin} lockedSuperadmin={data.areaLockedSuperadmin} /></Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section><Link to={`/sector/${data.sectorId}`}>{data.sectorName}</Link> <LockSymbol lockedAdmin={data.sectorLockedAdmin} lockedSuperadmin={data.sectorLockedSuperadmin} /></Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section active>{data.name} {data.grade} <LockSymbol lockedAdmin={data.lockedAdmin} lockedSuperadmin={data.lockedSuperadmin} /></Breadcrumb.Section>
        </Breadcrumb>
      </div>
      {(data.areaAccessClosed || data.sectorAccessClosed) && <Message size="huge" negative icon="attention" header={(data.areaAccessClosed? "Area": "Sector") + " closed!"} content={(data.areaAccessClosed||'') + (data.sectorAccessClosed||'')} />}
      <Tab panes={panes} />
      <Table definition unstackable>
        <Table.Body>
          {(data.areaAccessInfo || data.sectorAccessInfo || data.areaNoDogsAllowed) &&
            <Table.Row warning verticalAlign="top">
            <Table.Cell><Icon name='attention' /> Restrictions:</Table.Cell>
            <Table.Cell>
              {data.areaNoDogsAllowed &&
                <Header as="h5" color="red" image>
                  <Image src="/svg/no-animals.svg" alt="No dogs allowed" rounded size='mini'/>
                  <Header.Content>
                    The access to our crags are at the mercy of the farmers who own the land.
                    <Header.Subheader>Because of conflicts between dog-owners and farmers we ask you to not bring your dog to this specific crag.</Header.Subheader>
                  </Header.Content>
                </Header>
              }
              {data.areaAccessInfo && <p>{data.areaAccessInfo}</p>}
              {data.sectorAccessInfo && <p>{data.sectorAccessInfo}</p>}
            </Table.Cell>
          </Table.Row>
          }
          <Table.Row verticalAlign="top">
            <Table.Cell width={3}>Number:</Table.Cell>
            <Table.Cell>{data.nr}</Table.Cell>
          </Table.Row>
          {data.sectorIdProblemPrev>0 && (
            <Table.Row verticalAlign="top">
              <Table.Cell>Jump:</Table.Cell>
              <Table.Cell>
              <Button.Group size="mini">
                <Button size="tiny" as={Link} to={`/problem/${data.sectorIdProblemPrev}`} icon labelPosition='left'>
                  <Icon name='angle left' />
                  Prev
                </Button>
                <Button size="tiny" as={Link} to={`/problem/${data.sectorIdProblemNext}`} icon labelPosition='right'>
                  <Icon name='angle right' />
                  Next
                </Button>
              </Button.Group>
              </Table.Cell>
            </Table.Row>
          )}
          {data.faAid &&
            <Table.Row verticalAlign="top">
              <Table.Cell>First ascent (Aid):</Table.Cell>
              <Table.Cell>
                {data.faAid.dateHr && <Label basic><Icon name='calendar check' />{data.faAid.dateHr}</Label>}
                {data.faAid.users && <>{data.faAid.users.map((u, i) => (
                  <Label key={i} as={Link} to={`/user/${u.id}`} image basic>
                    {u.picture ? <img src={u.picture} /> : <Icon name="user"/>}{u.name}
                  </Label>
                ))}</>}
                {data.faAid.description && <Linkify componentDecorator={componentDecorator}><br/>{data.faAid.description}</Linkify>}
              </Table.Cell>
            </Table.Row>
          }
          <Table.Row verticalAlign="top">
            <Table.Cell>{data.faAid ? "First free ascent (FFA):" : "First ascent:"}</Table.Cell>
            <Table.Cell>
              <Label basic>Grade:<Label.Detail>{data.originalGrade}</Label.Detail></Label>
              {data.metadata.gradeSystem==='CLIMBING' && <Label basic><Icon name='tag' />{data.t.subType}</Label>}
              {data.faDateHr && <Label basic><Icon name='calendar check' />{data.faDateHr}</Label>}
              {data.fa && <>{data.fa.map((u, i) => (
                <Label key={i} as={Link} to={`/user/${u.id}`} image basic>
                  {u.picture ? <img src={u.picture} /> : <Icon name="user"/>}{u.name}
                </Label>
              ))}</>}
              {data.comment && data.comment.trim().length>0 && <Linkify componentDecorator={componentDecorator}><br/>{data.comment}</Linkify>}
              {data.metadata.gradeSystem==='ICE' &&
                <>
                  <br/><b>Starting altitude: </b>{data.startingAltitude}
                  <br/><b>Aspect: </b>{data.aspect}
                  <br/><b>Route length: </b>{data.routeLength}
                  <br/><b>Descent: </b>{data.descent}
                </>
              }
            </Table.Cell>
          </Table.Row>
          {(data.trivia || data.triviaMedia?.length>0) && 
            <Table.Row verticalAlign="top">
              <Table.Cell>Trivia:</Table.Cell>
              <Table.Cell>
                {data.trivia && <Linkify componentDecorator={componentDecorator}>{data.trivia}</Linkify>}
                {data.triviaMedia && <Feed.Extra><Media isAdmin={data.metadata.isAdmin} numPitches={data.sections?.length || 0} removeMedia={() => window.location.reload()} media={data.triviaMedia} optProblemId={null} isBouldering={isBouldering} /></Feed.Extra>}
              </Table.Cell>
            </Table.Row>
          }
          {problemsOnRock && problemsOnRock.length>0 && data.rock && 
            <Table.Row verticalAlign="top">
              <Table.Cell>Rock «{data.rock}»:</Table.Cell>
              <Table.Cell>
                {problemsOnRock.map((p, key) => (
                  <Label key={key} as={Link} to={`/problem/${p.id}`} active={data.id===p.id}>
                    #{p.nr} {p.name} {p.grade}
                    <Label.Detail>
                      <Stars numStars={p.stars} includeNoRating={false} />
                      {p.lat>0 && p.lng>0 && <Icon size="small" name="map marker alternate"/>}
                      {p.hasTopo && <Icon size="small" name="paint brush"/>}
                      {p.hasImages>0 && <Icon size="small" color="black" name="photo"/>}
                      {p.hasMovies>0 && <Icon size="small" color="black" name="film"/>}
                      <LockSymbol lockedAdmin={p.lockedAdmin} lockedSuperadmin={p.lockedSuperadmin} />
                      {p.ticked && <Icon size="small" color="green" name="check"/>}
                    </Label.Detail>
                  </Label>
                ))}
              </Table.Cell>
            </Table.Row>
          }
          {data.ticks &&
            <Table.Row verticalAlign="top">
              <Table.Cell>Public ascents:</Table.Cell>
              <Table.Cell>{data.ticks.length}</Table.Cell>
            </Table.Row>
          }
          {data.todos &&
            <Table.Row verticalAlign="top">
              <Table.Cell>On TODO-list:</Table.Cell>
              <Table.Cell>
                {data.todos.map((u, i) => (
                  <Label size="mini" key={i} as={Link} to={`/user/${u.idUser}`} image basic>
                    {u.picture ? <img src={u.picture} /> : <Icon name="user"/>}{u.name}
                  </Label>
                ))}
              </Table.Cell>
            </Table.Row>
          }
          {lat && lng &&
            <Table.Row>
              <Table.Cell>Weather:</Table.Cell>
              <Table.Cell>
                <WeatherLabels lat={lat} lng={lng} label={data.name} />
              </Table.Cell>
            </Table.Row>
          }
          <Table.Row verticalAlign="top">
            <Table.Cell>Misc:</Table.Cell>
            <Table.Cell>
              <Label href={getProblemPdfUrl(data.accessToken, data.id)} rel="noreferrer noopener" target="_blank" image basic>
                <Icon name="file pdf outline"/>{data.metadata.gradeSystem==='BOULDER'? "boulder.pdf" : "route.pdf"}
              </Label>
              <Label href={getSectorPdfUrl(data.accessToken, data.sectorId)} rel="noreferrer noopener" target="_blank" image basic>
                <Icon name="file pdf outline"/>sector.pdf
              </Label>
              <Label href={getAreaPdfUrl(data.accessToken, data.areaId)} rel="noreferrer noopener" target="_blank" image basic>
                <Icon name="file pdf outline"/>area.pdf
              </Label>
              {data.sectorLat>0 && data.sectorLng>0 &&
                <Label href={`https://www.google.com/maps/search/?api=1&query=${data.sectorLat},${data.sectorLng}`} rel="noreferrer noopener" target="_blank" image basic >
                  <Icon name="map"/>Parking (Google Maps)
                </Label>
              }
              {data.lat>0 && data.lng>0 &&
                <Label href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`} rel="noreferrer noopener" target="_blank" image basic >
                  <Icon name="map"/>{isBouldering? "Boulder" : "Route"} (Google Maps)
                </Label>
              }
            </Table.Cell>
          </Table.Row>
          <Table.Row verticalAlign="top">
            <Table.Cell>Page views:</Table.Cell>
            <Table.Cell>{data.hits}</Table.Cell>
          </Table.Row>
          {data.sections &&
            <Table.Row verticalAlign="top">
              <Table.Cell verticalAlign="top">Pitches:</Table.Cell>
              <Table.Cell>
                <Feed size="small">
                  {data.sections.map((s, i) => (
                    <Feed.Event key={i}>
                      <Feed.Label style={{marginTop: '8px'}}>{s.nr}</Feed.Label>
                      <Feed.Content>
                        <Feed.Summary>
                          <Feed.Label>{s.grade}</Feed.Label> 
                          <Feed.Date>{s.description}</Feed.Date>
                          {s.media && <Feed.Extra><Media isAdmin={data.metadata.isAdmin} numPitches={data.sections?.length || 0} removeMedia={() => window.location.reload()} media={s.media} optProblemId={null} isBouldering={isBouldering} /></Feed.Extra>}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  ))}
                </Feed>  
              </Table.Cell>
            </Table.Row>
          }
        </Table.Body>
      </Table>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>{ticks}</Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>{comments}</Grid.Column>
      </Grid>
    </>
  );
}

export default Problem;
