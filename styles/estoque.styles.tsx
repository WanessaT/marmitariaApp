import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f7fafc',
		padding: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 12,
		color: '#0f172a',
	},
	form: {
		backgroundColor: '#fff',
		padding: 12,
		borderRadius: 10,
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		marginTop: 8,
		marginBottom: 6,
		color: '#334155',
	},
	input: {
		borderWidth: 1,
		borderColor: '#e2e8f0',
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 8,
		backgroundColor: '#fff',
		fontSize: 16,
	},
	saveButton: {
		marginTop: 12,
		backgroundColor: '#10b981',
		paddingVertical: 14,
		borderRadius: 10,
		alignItems: 'center',
	},
	saveButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: '700',
		marginBottom: 8,
		color: '#0f172a',
	},
	card: {
		backgroundColor: '#fff',
		padding: 12,
		borderRadius: 10,
		marginBottom: 10,
	},
	cardRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	itemName: {
		fontSize: 16,
		fontWeight: '700',
		color: '#111827',
	},
	itemSub: {
		fontSize: 14,
		color: '#475569',
		marginTop: 6,
	},
	actions: {
		flexDirection: 'row',
		gap: 8,
	},
	actionButton: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 8,
		backgroundColor: '#f3f4f6',
		marginLeft: 8,
	},
	deleteButton: {
		backgroundColor: '#ef4444',
	},
	actionText: {
		color: '#111827',
		fontWeight: '600',
	},
	empty: {
		color: '#6b7280',
		fontSize: 15,
	},
	center: {
		alignItems: 'center',
		paddingTop: 24,
	},
});