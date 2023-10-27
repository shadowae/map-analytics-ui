import React from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import {Record} from "./model/Record";

type InfoModalProps = {
	isOpen: boolean;
	onClose: () => void;
	info: Record | null;
};

const getText = (info: Record | null) => {
	if(info) {
		return (
			<>
				<p>{info.RecordId}</p>
				<p>{info.Estate}</p>
				<p>{info.Block}</p>
				<p>{info.InspectionType}</p>
				<p>{info.Inspector}</p>
				<p>{info.DateTime.toString()}</p>
			</>
		)
	}
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, info }) => {
	return (
		<IonModal isOpen={isOpen} onDidDismiss={onClose}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Info</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{getText(info)}
				<IonButton onClick={onClose}>Close</IonButton>
			</IonContent>
		</IonModal>
	);
};

export default InfoModal;
