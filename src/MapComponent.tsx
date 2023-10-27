import React, {useRef, useEffect, useState} from 'react';
import {GoogleMap, Polyline} from '@capacitor/google-maps';
import InfoModal from './InfoModal';
import {Record} from './model/Record';
import {Coordinate} from "./model/Coordinate";

type Props = {
	records: Record[];
};

const MapComponent: React.FC<Props> = ({ records }) => {
	const mapRef = useRef<HTMLElement>(null);
	const newMapRef = useRef<GoogleMap | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [modalInfo, setModalInfo] = useState<Record | null>(null);
	
	const markerClick = (marker: { title: any; }) => {
		const record = records.filter(e => e.RecordId === marker.title)
		setModalInfo(record[0]);
		setShowModal(true);
		console.log(marker.title);
	}
	
	useEffect(() => {
		const createMap = async () => {
			if (!mapRef.current || !process.env.REACT_APP_GOOGLE_MAP_API) {
				console.error('mapRef or Map API key is null');
				return;
			}
			
			newMapRef.current = await GoogleMap.create({
				id: 'analytics-map',
				element: mapRef.current,
				apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
				config: {
					center: {
						lat: 40.7128,
						lng: -74.0060
					},
					zoom: 15
				}
			});

			// Plot markers on the map
			for (const record of records) {
				if (record.InspectionType === 'FIR') {
					// For FIR, plot multiple pins and connect them with a polyline
					const coordinates = record.Coordinates.map((coordinate: Coordinate) => {
						return { lat: coordinate.lat, lng: coordinate.lng };
					});
					
					// Create Polyline object (this is hypothetical and based on your plugin's API)
					const polyline: Polyline = {
						path: coordinates,
						strokeColor: '#AA00FF',
						strokeWeight: 10,
						geodesic: true,
						clickable: true  // make it clickable if you want
					};
					
					// Add polyline (this is hypothetical and based on your plugin's API)
					await newMapRef.current!.addPolylines([polyline]);
				}
				
				for (const coordinate of record.Coordinates) {
					await newMapRef.current!.addMarker({
						coordinate: coordinate,
						opacity: 0.5,
						title: record.RecordId
					});
				}
			}
			newMapRef.current!.setOnMarkerClickListener(markerClick);
		};
		
		createMap();
		}, [markerClick, records]);
	
	return (
		<div className="component-wrapper">
			<capacitor-google-map ref={mapRef} style={{
				display: 'flex',
				width: '100%',
				height: '400px'
			}}></capacitor-google-map>
			<InfoModal isOpen={showModal} onClose={() => setShowModal(false)} info={modalInfo} />
		</div>
	);
};

export default MapComponent;
