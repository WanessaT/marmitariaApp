import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type AppRoute =
	| '/pedido'
	| '/pedidos'
	| '/estoque'
	| '/relatorio'
	| '/gastos'
	| '/clientes'
	| '/precos'
	| '/sobre';

export default function Home() {
	const router = useRouter();

	const buttons: { key: string; label: string; route: AppRoute; icon?: string }[] = [
		{ key: 'novo', label: 'Novo Pedido', route: '/pedido', icon: '🆕' },
		{ key: 'dia', label: 'Pedidos', route: '/pedidos', icon: '📋' },
		{ key: 'estoque', label: 'Controle de Estoque', route: '/estoque', icon: '📦' },
		{ key: 'rel', label: 'Relatório Mensal', route: '/relatorio', icon: '📈' },
		{ key: 'gastos', label: 'Gastos', route: '/gastos', icon: '💸' },
		{ key: 'clientes', label: 'Clientes', route: '/clientes', icon: '👥' },
        { key: 'config', label: 'Preços', route: '/precos', icon: '⚙️' },
		{ key: 'sobre', label: 'Sobre o Projeto', route: '/sobre', icon: 'ℹ️' },

	];

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Dona Panela Marmitaria</Text>

			<View style={styles.buttonsContainer}>
				{buttons.map((b) => (
					<TouchableOpacity
						key={b.key}
						style={styles.button}
						onPress={() => router.push(b.route)}
						accessibilityLabel={`nav-${b.key}`}
					>
						<Text style={styles.buttonIcon}>{b.icon}</Text>
						<Text style={styles.buttonText}>{b.label}</Text>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 24,
		backgroundColor: '#F7FAFC',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 24,
		textAlign: 'center',
		color: '#1f2937',
	},
	buttonsContainer: {
		width: '100%',
		maxWidth: 520,
		alignItems: 'center',
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff',
		borderRadius: 12,
		paddingVertical: 16,
		paddingHorizontal: 20,
		marginBottom: 12,
		width: '100%',
		shadowColor: '#000',
		shadowOpacity: 0.04,
		shadowRadius: 6,
		elevation: 2,
	},
	buttonIcon: {
		fontSize: 20,
		marginRight: 12,
	},
	buttonText: {
		fontSize: 18,
		color: '#111827',
		fontWeight: '600',
	},
});

