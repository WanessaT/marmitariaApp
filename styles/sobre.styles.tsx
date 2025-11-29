import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#ffffff',
	},
	title: {
		fontSize: 22,
		fontWeight: '700',
		marginBottom: 16,
		textAlign: 'center',
		color: '#0f172a',
	},
	paragraph: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 14,
	},
	icon: {
		fontSize: 22,
		marginRight: 12,
	},
	text: {
		flex: 1,
		fontSize: 16,
		lineHeight: 22,
		color: '#334155',
	},
	footer: {
		marginTop: 20,
		alignItems: 'center',
	},
	footerText: {
		fontSize: 14,
		color: '#6b7280',
	},
});
