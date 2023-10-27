import React, { useState, useEffect } from 'react';
import FilterComponent from './FilterComponent';
import MapComponent from './MapComponent';
import { Filters, fetchRecords } from './fetchData';

const MapPage: React.FC = () => {
	const [filters, setFilters] = useState<Filters>({});
	const [records, setRecords] = useState<any[]>([]);
	
	useEffect(() => {
		console.log('triggers')
		const fetchData = async () => {
			const fetchedRecords = await fetchRecords(filters);
			setRecords(fetchedRecords);
		};
		
		fetchData();
	}, [filters]);
	
	const handleFilterChange = (newFilter: string) => {
		setFilters({ InspectionType: newFilter });
	};
	
	return (
		<div>
			<div><FilterComponent onFilterChange={handleFilterChange} /></div>
			<MapComponent records={records} />
		</div>
	);
};

export default MapPage;
