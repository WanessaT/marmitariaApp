import { styles } from '@/styles/estoque.styles';
import { ItemEstoque } from '@/utils/types/estoque.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import {
	Alert,
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

export default function EstoqueScreen() {
	const [nome, setNome] = useState('');
	const [quantidade, setQuantidade] = useState('');
	const [unidade, setUnidade] = useState('kg');
	const [itens, setItens] = useState<ItemEstoque[]>([]);
	const [editingId, setEditingId] = useState<string | null>(null);

	const STORAGE_KEY = 'estoque';

	const loadItens = useCallback(async () => {
		try {
			const raw = await AsyncStorage.getItem(STORAGE_KEY);
			const lista: ItemEstoque[] = raw ? JSON.parse(raw) : [];
			setItens(lista);
		} catch (err) {
			console.error('Erro ao carregar estoque:', err);
			setItens([]);
		}
	}, []);

	useEffect(() => {
		loadItens();
	}, [loadItens]);

	const saveList = async (lista: ItemEstoque[]) => {
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
		setItens(lista);
	};

	const onAddOrUpdate = async () => {
		if (!nome.trim()) {
			Alert.alert('Validação', 'Informe o nome do insumo.');
			return;
		}
		const qtd = parseFloat(quantidade.replace(',', '.'));
		if (isNaN(qtd)) {
			Alert.alert('Validação', 'Informe uma quantidade válida.');
			return;
		}

		if (editingId) {
			const updated = itens.map((it) => (it.id === editingId ? { ...it, nome: nome.trim(), quantidade: qtd, unidade: unidade.trim() } : it));
			await saveList(updated);
			setEditingId(null);
			setNome('');
			setQuantidade('');
			setUnidade('kg');
			return;
		}

		const novo: ItemEstoque = {
			id: Date.now().toString(),
			nome: nome.trim(),
			quantidade: qtd,
			unidade: unidade.trim() || 'un',
		};

		const novaLista = [novo, ...itens];
		await saveList(novaLista);
		setNome('');
		setQuantidade('');
		setUnidade('kg');
	};

	const onEdit = (item: ItemEstoque) => {
		setEditingId(item.id);
		setNome(item.nome);
		setQuantidade(String(item.quantidade));
		setUnidade(item.unidade);
	};

	const onDelete = (id: string) => {
		Alert.alert('Confirmar', 'Excluir este item do estoque?', [
			{ text: 'Cancelar', style: 'cancel' },
			{
				text: 'Excluir',
				style: 'destructive',
				onPress: async () => {
					const nova = itens.filter((i) => i.id !== id);
					await saveList(nova);
				},
			},
		]);
	};

	const renderItem = ({ item }: { item: ItemEstoque }) => (
		<View style={styles.card}>
			<View style={styles.cardRow}>
				<Text style={styles.itemName}>{item.nome}</Text>
				<View style={styles.actions}>
					<TouchableOpacity onPress={() => onEdit(item)} style={styles.actionButton}>
						<Text style={styles.actionText}>Editar</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => onDelete(item.id)} style={[styles.actionButton, styles.deleteButton]}>
						<Text style={[styles.actionText, { color: '#fff' }]}>Excluir</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Text style={styles.itemSub}>{String(item.quantidade)} {item.unidade}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Controle de Estoque</Text>

			<View style={styles.form}>
				<Text style={styles.label}>Nome do insumo</Text>
				<TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex.: Arroz" />

				<Text style={styles.label}>Quantidade disponível</Text>
				<TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} placeholder="Ex.: 10" keyboardType="numeric" />

				<Text style={styles.label}>Unidade</Text>
				<TextInput style={styles.input} value={unidade} onChangeText={setUnidade} placeholder="kg / litros / un" />

				<TouchableOpacity style={styles.saveButton} onPress={onAddOrUpdate}>
					<Text style={styles.saveButtonText}>{editingId ? 'Atualizar item' : 'Adicionar ao estoque'}</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.sectionTitle}>Itens no estoque</Text>
			{itens.length === 0 ? (
				<View style={styles.center}><Text style={styles.empty}>Nenhum item no estoque.</Text></View>
			) : (
				<FlatList data={itens} keyExtractor={(i) => i.id} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 40 }} />
			)}
		</View>
	);
}



