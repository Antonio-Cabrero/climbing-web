import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import UserSelector from './common/user-selector/user-selector';
import RockSelector from './common/rock-selector/rock-selector';
import ProblemSection from './common/problem-section/problem-section';
import ImageUpload from './common/image-upload/image-upload';
import { Icon, Form, Button, Input, Dropdown, TextArea, Segment, Message, Container, Checkbox } from 'semantic-ui-react';
import Leaflet from './common/leaflet/leaflet';
import { useAuth0 } from '@auth0/auth0-react';
import { getProblemEdit, convertFromDateToString, convertFromStringToDate, postProblem, getSector } from '../api';
import { Loading, InsufficientPrivileges } from './common/widgets/widgets';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ProblemEdit = () => {
  const { isLoading, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [data, setData] = useState(null);
  const [sectorMarkers, setSectorMarkers] = useState([]);
  const [sectorRocks, setSectorRocks] = useState([]);
  const [showSectorMarkers, setShowSectorMarkers] = useState(true);
  const [saving, setSaving] = useState(false);
  let { sectorIdProblemId } = useParams();
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (sectorIdProblemId && isAuthenticated) {
      getAccessTokenSilently().then((accessToken) => {
        getProblemEdit(accessToken, sectorIdProblemId).then((data) => setData({...data, accessToken}));
        let sectorIdProblemIdArray = sectorIdProblemId.split("-");
        let sectorId = sectorIdProblemIdArray[0];
        let problemId = sectorIdProblemIdArray[1];
        getSector(accessToken, parseInt(sectorId)).then((data) => {
          setSectorMarkers(data.problems.filter(p => p.lat>0 && p.lng>0 && p.id!=problemId).map(p => ({lat: p.lat, lng: p.lng, label: p.name})));
          setSectorRocks(data.problems.filter(p => p.rock).map(p => p.rock).filter((value, index, self) => self.indexOf(value) === index).sort());
        });
      });
    }
  }, [isAuthenticated, sectorIdProblemId]);

  function onNameChanged(e, { value }) {
    setData(prevState => ({ ...prevState, name: value }));
  }

  function onNrChanged(e, { value }) {
    setData(prevState => ({ ...prevState, nr: value }));
  }

  function onLatChanged(e, { value }) {
    let latStr = value.replace(",",".");
    let lat = parseFloat(latStr);
    if (isNaN(lat)) {
      lat = 0;
      latStr = '';
    }
    setData(prevState => ({ ...prevState, lat, latStr }));
  }

  function onLngChanged(e, { value }) {
    let lngStr = value.replace(",",".");
    let lng = parseFloat(lngStr);
    if (isNaN(lng)) {
      lng = 0;
      lngStr = '';
    }
    setData(prevState => ({ ...prevState, lng, lngStr }));
  }

  function onLockedChanged(e, { value }) {
    setData(prevState => ({
      ...prevState,
      lockedAdmin: value == 1,
      lockedSuperadmin: value == 2
    }));
  }

  function onRockChanged(rock) {
    setData(prevState => ({ ...prevState, rock }));
  }

  function onCommentChanged(e, { value }) {
    setData(prevState => ({ ...prevState, comment: value }));
  }

  function onFaDateChanged(newFaDate) {
    let faDate = newFaDate? convertFromDateToString(newFaDate) : null;
    setData(prevState => ({ ...prevState, faDate }));
  }

  function onOriginalGradeChanged(e, { value }) {
    setData(prevState => ({ ...prevState, originalGrade: value }));
  }

  function onTypeIdChanged(e, { value }) {
    let typeId = parseInt(value);
    setData(prevState => ({ ...prevState, typeId }));
  }

  function onNewMediaChanged(newMedia) {
    setData(prevState => ({ ...prevState, newMedia }));
  }

  function onFaAidDateChanged(newFaDate) {
    let faDate = newFaDate? convertFromDateToString(newFaDate) : null;
    let faAid = data.faAid;
    data.faAid.date = faDate;
    setData(prevState => ({ ...prevState, faAid }));
  }

  function onFaAidDescriptionChanged(e, { value }) {
    let faAid = data.faAid;
    faAid.description = value;
    setData(prevState => ({ ...prevState, faAid }));
  }

  function onFaAidUsersUpdated(newUsers) {
    let fa = newUsers.map(u => {
      return {id: (typeof u.value === 'string' || u.value instanceof String)? -1 : u.value, name: u.label};
    });
    let faAid = data.faAid;
    faAid.users = fa;
    setData(prevState => ({ ...prevState, faAid }));
  }

  function onTriviaChanged(e, { value }) {
    setData(prevState => ({ ...prevState, trivia: value }));
  }

  function onStartingAltitudeChanged(e, { value }) {
    setData(prevState => ({ ...prevState, startingAltitude: value }));
  }

  function onAspectChanged(e, { value }) {
    setData(prevState => ({ ...prevState, aspect: value }));
  }

  function onRouteLengthChanged(e, { value }) {
    setData(prevState => ({ ...prevState, routeLength: value }));
  }

  function onDescentChanged(e, { value }) {
    setData(prevState => ({ ...prevState, descent: value }));
  }

  function save(event, addNew) {
    event.preventDefault();
    const trash = data.trash? true : false;
    if (!trash || confirm("Are you sure you want to move problem/route to trash?")) {
      setSaving(true);
      postProblem(
        data.accessToken,
        data.sectorId,
        data.id,
        data.trash,
        data.lockedAdmin,
        data.lockedSuperadmin,
        data.name,
        data.rock,
        data.comment,
        data.originalGrade,
        data.fa,
        data.faDate,
        data.nr,
        (data.typeId? data.metadata.types.find(t => t.id === data.typeId) : data.metadata.types[0]),
        data.lat,
        data.lng,
        data.sections,
        data.newMedia,
        data.faAid,
        data.trivia,
        data.startingAltitude, data.aspect, data.routeLength, data.descent)
      .then((res) => {
        if (addNew) {
          navigate(0);
        }
        else {
          navigate(res.destination);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
    }
  }

  function onMapClick(event) {
    setData(prevState => ({ ...prevState, lat: event.latlng.lat, lng: event.latlng.lng, latStr: event.latlng.lat, lngStr: event.latlng.lng }));
  }

  function onUsersUpdated(newUsers) {
    let fa = newUsers.map(u => {
      return {id: (typeof u.value === 'string' || u.value instanceof String)? -1 : u.value, name: u.label};
    });
    setData(prevState => ({ ...prevState, fa }));
  }

  function onSectionsUpdated(sections) {
    setData(prevState => ({ ...prevState, sections }));
  }

  if (isLoading || (isAuthenticated && !data)) {
    return <Loading />;
  } else if (!isAuthenticated) {
    loginWithRedirect({appState: { returnTo: location.pathname }});
  } else if (!data.metadata.isAdmin) {
    return <InsufficientPrivileges />
  } else {
    var defaultCenter;
    var defaultZoom: number;
    if (data.lat!=0 && data.lng!=0) {
      defaultCenter = {lat: data.lat, lng: data.lng};
      defaultZoom = 15;
    }
    else {
      defaultCenter = data.metadata.defaultCenter;
      defaultZoom = data.metadata.defaultZoom;
    }
    const lockedOptions = [
      {key: 0, value: 0, text: "Visible for everyone"},
      {key: 1, value: 1, text: "Only visible for administrators"}
    ];
    if (data.metadata.isSuperAdmin) {
      lockedOptions.push({key: 2, value: 2, text: "Only visible for super administrators"})
    }
    let lockedValue = 0;
    if (data.lockedSuperadmin) {
      lockedValue = 2;
    } else if (data.lockedAdmin) {
      lockedValue = 1;
    }

    let markers = [];
    if (data.lat!=0 && data.lng!=0) {
      markers.push({lat: data.lat, lng: data.lng});
    }
    if (showSectorMarkers && sectorMarkers) {
      markers.push(...sectorMarkers);
    }

    const sectorId = sectorIdProblemId.split("-")[0];
    const problemId = sectorIdProblemId.split("-")[1];

    return (
      <>
        <Helmet>
          <title>{data.metadata.title}</title>
        </Helmet>
        <Message
          size="tiny"
          content={<><Icon name="info"/>Contact <a href='mailto:jostein.oygarden@gmail.com'>Jostein Øygarden</a> if you want to move {data.metadata.gradeSystem==='BOULDER'? "problem" : "route"} to an other sector.</>}
        />
        <Form>
          <Segment>
            <Form.Group widths='equal'>
              <Form.Field
                  label="Name"
                  control={Input}
                  placeholder="Enter name"
                  value={data.name}
                  onChange={onNameChanged}
                  error={data.name? false : "Name required"}
                />
              <Form.Field
                label="Visibility"
                control={Dropdown}
                selection
                value={lockedValue}
                onChange={onLockedChanged}
                options={lockedOptions} />
              <Form.Field
                label="Number"
                control={Input}
                placeholder='Enter number'
                value={data.nr}
                onChange={onNrChanged} />
              <Form.Field>
                <label>Move to trash</label>
                <Checkbox disabled={!data.id || data.id<=0} toggle checked={data.trash} onChange={() => setData(prevState => ({ ...prevState, trash: !data.trash }))} />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field
                label="Grade"
                control={Dropdown}
                selection
                value={data.originalGrade}
                onChange={onOriginalGradeChanged}
                options={data.metadata.grades.map((g, i) => ({key: i, value: g.grade, text: g.grade}))}
                error={data.originalGrade? false : "grade required"}/>
              <Form.Field
                label="FA User(s)"
                control={UserSelector}
                isMulti={true}
                placeholder="Select user(s)"
                users={data.fa? data.fa.map(u => {return {value: u.id, label: u.name}}) : []} onUsersUpdated={onUsersUpdated} identity={null} />
              <Form.Field>
                <label>FA Date</label>
                <DatePicker
                  placeholderText="Click to select a date"
                  dateFormat="dd-MM-yyyy"
                  showMonthDropdown showYearDropdown dropdownMode="select"
                  selected={convertFromStringToDate(data.faDate)}
                  onChange={(date) => onFaDateChanged(date)}
                />
              </Form.Field>
              {data.metadata.gradeSystem==='BOULDER' ?
                <Form.Field
                  label="Rock (this field is optional, use to group boulders by rock in sector)"
                  control={RockSelector}
                  placeholder="Add rock"
                  rock={data.rock} onRockUpdated={onRockChanged} rocks={sectorRocks} identity={null} />
                :
                <Form.Field/>
              }
            </Form.Group>
            <Form.Field
              label="Description"
              control={TextArea}
              placeholder='Enter description'
              style={{ minHeight: 100 }}
              value={data.comment}
              onChange={onCommentChanged} />
            <Form.Field
              label="Trivia (e.g. name origin)"
              control={TextArea}
              placeholder='Enter trivia'
              style={{ minHeight: 100 }}
              value={data.trivia}
              onChange={onTriviaChanged} />
            {data.metadata.gradeSystem==='ICE' &&
              <>
                <Form.Field
                  label="Starting altitude"
                  control={Input}
                  placeholder="Enter starting altitude"
                  value={data.startingAltitude}
                  onChange={onStartingAltitudeChanged}
                />
                <Form.Field
                  label="Aspect"
                  control={Input}
                  placeholder="Enter aspect"
                  value={data.aspect}
                  onChange={onAspectChanged}
                />
                <Form.Field
                  label="Route length"
                  control={Input}
                  placeholder="Enter route length"
                  value={data.routeLength}
                  onChange={onRouteLengthChanged}
                />
                <Form.Field
                  label="Descent"
                  control={Input}
                  placeholder="Enter descent"
                  value={data.descent}
                  onChange={onDescentChanged}
                />
              </>
            }
          </Segment>
            
          <Segment>
            <Form.Field>
              <label>Upload image(s) or embed video(s)</label><br/>
              <ImageUpload onMediaChanged={onNewMediaChanged} isMultiPitch={data.sections && data.sections.length>1} includeVideoEmbedder={true} />
            </Form.Field>
          </Segment>
          
          {data.metadata.gradeSystem==='CLIMBING' &&
            <Segment>
              <Form.Field
                label="Type"
                control={Dropdown}
                selection
                value={data.typeId}
                onChange={onTypeIdChanged}
                options={data.metadata.types.map((t, i) => {
                  const text = t.type + (t.subType? " - " + t.subType : "")
                  return ({key: i, value: t.id, text: text});
                })}
                error={data.typeId? false : "Type required"}>
              </Form.Field>
              <Form.Field>
                <label>First AID ascent?</label>
                <Button.Group size="tiny">
                  <Button onClick={() => setData(prevState => ({ ...prevState, faAid: {problemId: data.id, date: '', description: ''} }))} positive={data.faAid? true : false}>Yes</Button>
                  <Button.Or />
                  <Button onClick={() => setData(prevState => ({ ...prevState, faAid: null }))} positive={data.faAid? false : true}>No</Button>
                </Button.Group>
                {data.faAid &&
                  <Container>
                    <DatePicker
                      placeholderText="Click to select a date"
                      dateFormat="dd-MM-yyyy"
                      withPortal portalId="root-portal"
                      showMonthDropdown showYearDropdown dropdownMode="select"
                      selected={convertFromStringToDate(data.faAid? data.faAid.date : '')}
                      onChange={(date) => onFaAidDateChanged(date)}
                    />
                    <TextArea placeholder='Enter description' style={{ minHeight: 75 }} value={data.faAid.description} onChange={onFaAidDescriptionChanged} />
                    <UserSelector isMulti={true} placeholder="Select user(s)" users={data.faAid.users? data.faAid.users.map(u => {return {value: u.id, label: u.name}}) : []} onUsersUpdated={onFaAidUsersUpdated} identity={null} />
                  </Container>
                }
              </Form.Field>
              <Form.Field>
                <label>Pitches</label>
                <ProblemSection sections={data.sections} grades={data.metadata.grades} onSectionsUpdated={onSectionsUpdated} />
              </Form.Field>
            </Segment>
          }

          <Segment>
            <Form.Field>
              <label>Click to mark problem on map</label>
              <Leaflet
                autoZoom={true}
                markers={markers}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                onMouseClick={onMapClick}
                onMouseMove={null}
                navigate={navigate}
                polylines={null}
                outlines={null}
                height={'300px'}
                showSateliteImage={true} 
                clusterMarkers={false}
                rocks={null}
                flyToId={null}
              />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Latitude</label>
                <Input placeholder='Latitude' value={data.latStr} onChange={onLatChanged} />
              </Form.Field>
              <Form.Field>
                <label>Longitude</label>
                <Input placeholder='Longitude' value={data.lngStr} onChange={onLngChanged} />
              </Form.Field>
              <Form.Field>
                <label>Include all markers in sector</label>
                <Checkbox toggle checked={showSectorMarkers} onChange={(e,d) => {
                  if (d.checked) {
                    setShowSectorMarkers(true);
                  } else {
                    setShowSectorMarkers(false);
                  }
                }} />
              </Form.Field>
            </Form.Group>
          </Segment>

          <Button.Group>
            <Button negative onClick={() => {
              if (problemId && problemId != '0') {
                navigate(`/problem/${problemId}`)
              } else {
                navigate(`/sector/${sectorId}`)
              }
            }}>Cancel</Button>
            <Button.Or />
            <Button positive loading={saving} onClick={(event) => save(event, false)} disabled={!data.name || (data.metadata.types.length > 1 && !data.typeId)}>Save</Button>
            {problemId==='0' &&
              <>
                <Button.Or />
                <Button positive loading={saving} onClick={(event) => save(event, true)} disabled={!data.name || (data.metadata.types.length > 1 && !data.typeId)}>Save, and add new</Button>
              </>
            }
          </Button.Group>
        </Form>
      </>
    );
  }
}

export default ProblemEdit;
