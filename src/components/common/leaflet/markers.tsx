import React, { useRef, useEffect } from "react";
import { Marker, Tooltip, Popup, useMap } from "react-leaflet";
import { markerBlueIcon, markerRedIcon, parkingIcon, weatherIcon, rockIcon } from './icons';

export default function Markers({ navigate, opacity, markers, addEventHandlers, flyToId }) {
  const map = useMap();
  const markerRefs = useRef({});
  useEffect(() => {
    if (map && flyToId && markerRefs.current[flyToId]) {
      const marker = markerRefs.current[flyToId];
      map.flyTo(marker._latlng, 13, {animate: false});
      marker.openPopup();
    }
  }, [flyToId]);

  if (!markers) {
    return null;
  }
  return (
    markers.map((m, i) => {
      if (m.isParking) {
        return (
          <Marker
            icon={parkingIcon}
            position={[m.lat, m.lng]}
            key={i}
            eventHandlers={{
              click: () => {
                if (addEventHandlers) {
                  navigate(m.url)
                }
              }
            }}
          >
            {m.label && (
              <Tooltip opacity={opacity} permanent className='buldreinfo-tooltip-compact'>
                {m.label}
              </Tooltip>
            )}
          </Marker>
        )
      } else if (m.isCamera) {
        return (
          <Marker icon={weatherIcon} position={[m.lat, m.lng]} key={i}>
            <Popup closeButton={false}>
              <b>{m.name}</b>{i.lastUpdated && <> (<i>{m.lastUpdated}</i>)</>}
              <a rel='noreferrer noopener' target='_blank' href={m.urlStillImage}><img style={{maxWidth: '180px'}} src={m.urlStillImage}/></a><br/>
              <i>Click on image to open in new tab</i><br/><br/>
              {m.urlYr && <a rel='noreferrer noopener' target='_blank' href={m.urlYr}>yr.no weather forecast</a>}
              {m.urlOther && <a rel='noreferrer noopener' target='_blank' href={m.urlOther}>{m.urlOther}</a>}
            </Popup>
          </Marker>
        );
      } else if (m.html) {
        return (
          <Marker icon={m.rock? rockIcon : markerBlueIcon} position={[m.lat, m.lng]} key={i} ref={ref => markerRefs.current[m.id]=ref}>
            <Tooltip opacity={opacity} permanent className='buldreinfo-tooltip-compact'>
              {m.label}
            </Tooltip>
            <Popup closeButton={false}>
              {m.html}
            </Popup>
          </Marker>
        );
      } else if (m.label) {
        return (
          <Marker
            icon={markerBlueIcon}
            position={[m.lat, m.lng]}
            key={i}
            eventHandlers={{
              click: () => {
                if (addEventHandlers) {
                  navigate(m.url)
                }
              }
            }}
            draggable={false} >
            <Tooltip opacity={opacity} permanent className='buldreinfo-tooltip-compact'>
              {m.label}
            </Tooltip>
          </Marker>
        )
      } else {
        return (
          <Marker
            icon={markerRedIcon}
            position={[m.lat, m.lng]}
            key={i}
            eventHandlers={{
              click: () => {
                if (addEventHandlers) {
                  navigate(m.url)
                }
              }
            }}
            draggable={false} >
          </Marker>
        )
      }
    })
  );
}