import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8fafc',
		padding: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	title: {
		fontSize: 20,
		fontWeight: '700',
		color: '#0f172a',
	},
	refreshButton: {
		backgroundColor: '#2563eb',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 8,
	},
	refreshText: {
		color: '#fff',
		fontWeight: '600',
	},
	list: {
		paddingBottom: 24,
	},
	card: {
		backgroundColor: '#fff',
		padding: 14,
		borderRadius: 10,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOpacity: 0.03,
		shadowRadius: 6,
		elevation: 1,
	},
	cardRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	cardName: {
		fontSize: 16,
		fontWeight: '700',
		color: '#111827',
	},
	cardQty: {
		fontSize: 16,
		fontWeight: '600',
		color: '#374151',
	},
	cardText: {
		fontSize: 14,
		color: '#4b5563',
		marginBottom: 4,
	},
	cardDate: {
		fontSize: 12,
		color: '#6b7280',
		marginTop: 6,
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: {
		fontSize: 16,
		color: '#6b7280',
	},
});
