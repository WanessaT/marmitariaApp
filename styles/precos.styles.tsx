import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#f7fafc',
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 10,
		color: '#0f172a',
	},
	note: {
		fontSize: 14,
		color: '#475569',
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		color: '#334155',
		marginBottom: 6,
		marginTop: 8,
	},
	input: {
		backgroundColor: '#fff',
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 12,
		fontSize: 16,
		borderWidth: 1,
		borderColor: '#e6eef6',
	},
	saveButton: {
		marginTop: 18,
		backgroundColor: '#2563eb',
		paddingVertical: 14,
		borderRadius: 10,
		alignItems: 'center',
	},
	saveButtonText: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 16,
	},
	currentPrice: {
		marginTop: 6,
		fontSize: 14,
		color: '#475569',
	},
});

