export type Filters = {
	InspectionType?: string;
	// Add other filter types here
};

export const fetchRecords = async (filters: Filters) => {
	const response = await fetch(`http://localhost:3001/api/getRecords?${new URLSearchParams(filters)}`);
	return await response.json();
};
