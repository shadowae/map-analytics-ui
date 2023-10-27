import React from 'react';
import { IonSelect, IonLabel, IonItem, IonSelectOption } from '@ionic/react';

interface FilterComponentProps {
	onFilterChange: (newFilter: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilterChange }) => {
	const handleSelectChange = (event: CustomEvent) => {
		const selectedValue = event.detail.value;
		onFilterChange(selectedValue);
	};
	
	return (
		<IonItem>
			<IonLabel>Inspection Type</IonLabel>
			<IonSelect placeholder="Select One" onIonChange={handleSelectChange}>
				<IonSelectOption value="FIR">FIR</IonSelectOption>
				<IonSelectOption value="FQI">FQI</IonSelectOption>
				<IonSelectOption value="RI">RI</IonSelectOption>
			</IonSelect>
		</IonItem>
	);
};

export default FilterComponent;
