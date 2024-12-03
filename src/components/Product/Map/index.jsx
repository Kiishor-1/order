import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Home from '../../../assets/images/Marker.svg';
import Styles from './Map.module.css';

const mapToken = import.meta.env.VITE_REACT_APP_MAPBOX_API_KEY;
mapboxgl.accessToken = mapToken;

const Map = ({ listing }) => {
    const mapContainer = useRef(null);

    const isNightTimeInIndia = () => {
        const now = new Date();
        const hours = (now.getUTCHours() + 5.5) % 24;
        return hours >= 19 || hours < 4;
    };

    useEffect(() => {
        const defaultCoordinates = [81.629997, 21.250000]; // Fallback to Raipur
        // const defaultCoordinates = [28.6139, 77.2088]; // Fallback to Raipur
        // const defaultCoordinates = [-122.67837,45.515198];
        const coordinates = listing?.geometry?.coordinates || defaultCoordinates;

        let initialStyle = isNightTimeInIndia()
            ? 'mapbox://styles/mapbox/navigation-night-v1'
            : 'mapbox://styles/mapbox/streets-v12';

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: initialStyle,
            center: coordinates,
            zoom: 9,
        });

        const customMarker = document.createElement('div');
        customMarker.className = 'custom-marker';
        customMarker.style.backgroundImage = `url(${Home})`;
        customMarker.style.backgroundSize = '100%';
        customMarker.style.width = '32px';
        customMarker.style.height = '32px';
        customMarker.style.zIndex = "9999"

        new mapboxgl.Marker(customMarker)
            .setLngLat(coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                    `<h3>${listing?.name || 'Listing'}</h3>`
                    //  <p>Exact location will be provided after booking</p>`
                )
            )
            .addTo(map);

        const intervalId = setInterval(() => {
            const newStyle = isNightTimeInIndia()
                ? 'mapbox://styles/mapbox/dark-v11'
                : 'mapbox://styles/mapbox/streets-v12';
            if (map.getStyle().name !== newStyle) {
                map.setStyle(newStyle);
            }
        }, 60000);

        return () => {
            clearInterval(intervalId);
            map.remove();
        };
    }, [listing]);

    return (
        <div style={{ position: "relative" }}>
            <div ref={mapContainer} className={Styles.map} />
            <div className={Styles.location}>
                <section>
                    <h1>{listing?.name}</h1>
                    <span className={Styles.value}>
                        South London
                    </span>
                </section>
                <section className={Styles.address}>
                    <p>{listing?.address}</p>
                </section>
                <section>
                    <strong className={Styles.key}>Phone number</strong>
                    <span className={Styles.value}>{listing?.phone}</span>
                </section>
                <section>
                    <strong className={Styles.key}>Website</strong>
                    <span className={Styles.value}>{listing?.website}</span>
                </section>
            </div>
        </div>
    );
};

export default Map;
