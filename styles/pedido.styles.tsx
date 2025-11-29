import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 22,
		fontWeight: '600',
		marginBottom: 16,
		textAlign: 'center',
	},
	label: {
		fontSize: 16,
		marginTop: 12,
		marginBottom: 6,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 16,
		backgroundColor: '#fafafa',
	},
	multiline: {
		minHeight: 90,
		textAlignVertical: 'top',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	typeButton: {
		flex: 1,
		paddingVertical: 12,
		marginRight: 8,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ccc',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	typeButtonActive: {
		backgroundColor: '#2a9d8f',
		borderColor: '#2a9d8f',
	},
	typeText: {
		fontSize: 16,
		color: '#333',
	},
	typeTextActive: {
		color: '#fff',
		fontWeight: '600',
	},
	saveButton: {
		marginTop: 20,
		backgroundColor: '#e76f51',
		paddingVertical: 16,
		borderRadius: 10,
		alignItems: 'center',
	},
	saveButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '700',
	},
});
