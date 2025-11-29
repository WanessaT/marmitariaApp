import { styles } from '@/styles/pedidos.styles';
import { Pedido } from '@/utils/types/pedido.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

function isSameMonthISO(isoDate: string) {
	try {
		const d = new Date(isoDate);
		const now = new Date();
		return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
	} catch {
		return false;
	}
}

export default function ListaPedidosScreen() {
	const [pedidos, setPedidos] = useState<Pedido[]>([]);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const loadPedidos = useCallback(async () => {
		setLoading(true);
		try {
			const raw = await AsyncStorage.getItem('pedidos');
			const lista: Pedido[] = raw ? JSON.parse(raw) : [];
			// Filtra pedidos do mês atual (histórico mensal)
			const mes = lista.filter((p) => isSameMonthISO(p.criadoEm));
			setPedidos(mes);
		} catch (err) {
			console.error('Erro ao carregar pedidos:', err);
			setPedidos([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadPedidos();
	}, [loadPedidos]);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await loadPedidos();
		setRefreshing(false);
	}, [loadPedidos]);

	const renderPedido = ({ item }: { item: Pedido }) => {
		const data = new Date(item.criadoEm).toLocaleString();
		return (
			<View style={styles.card}>
				<View style={styles.cardRow}>
					<Text style={styles.cardName}>{item.nome}</Text>
					<Text style={styles.cardQty}>x{item.quantidade}</Text>
				</View>
				<Text style={styles.cardText}>Marmita: {item.tipo}</Text>
				<Text style={styles.cardText}>Pagamento: {item.pagamento || '—'}</Text>
				<Text style={styles.cardDate}>{data}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Pedidos</Text>
				<TouchableOpacity style={styles.refreshButton} onPress={loadPedidos} accessibilityLabel="atualizar-lista">
					<Text style={styles.refreshText}>Atualizar lista</Text>
				</TouchableOpacity>
			</View>

			{loading ? (
				<View style={styles.center}><ActivityIndicator size="large" /></View>
			) : pedidos.length === 0 ? (
				<View style={styles.center}>
					<Text style={styles.emptyText}>Nenhum pedido registrado neste mês.</Text>
				</View>
			) : (
				<FlatList
					data={pedidos}
					keyExtractor={(i) => i.id}
					renderItem={renderPedido}
					contentContainerStyle={styles.list}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				/>
			)}
		</View>
	);
}
