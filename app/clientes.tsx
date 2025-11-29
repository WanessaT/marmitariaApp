import { styles } from '@/styles/clientes.styles';
import { Cliente } from '@/utils/types/clientes.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ClientesScreen() {
	const [nome, setNome] = useState('');
	const [telefone, setTelefone] = useState('');
	const [endereco, setEndereco] = useState('');
	const [clientes, setClientes] = useState<Cliente[]>([]);

	const STORAGE_KEY = 'clientes';

	const loadClientes = useCallback(async () => {
		try {
			const raw = await AsyncStorage.getItem(STORAGE_KEY);
			const list: Cliente[] = raw ? JSON.parse(raw) : [];
			setClientes(list);
		} catch (err) {
			console.error('Erro ao carregar clientes', err);
			setClientes([]);
		}
	}, []);

	useEffect(() => {
		loadClientes();
	}, [loadClientes]);

	const saveClientes = async (list: Cliente[]) => {
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
		setClientes(list);
	};

	const onSave = async () => {
		if (!nome.trim()) {
			Alert.alert('Validação', 'Informe o nome do cliente.');
			return;
		}
		if (!telefone.trim()) {
			Alert.alert('Validação', 'Informe o telefone (WhatsApp).');
			return;
		}

		const novo: Cliente = {
			id: Date.now().toString(),
			nome: nome.trim(),
			telefone: telefone.trim(),
			endereco: endereco.trim(),
		};

		const novaLista = [novo, ...clientes];
		await saveClientes(novaLista);
		setNome('');
		setTelefone('');
		setEndereco('');
		Alert.alert('Sucesso', 'Cliente salvo com sucesso.');
	};

	const onDelete = (id: string) => {
		Alert.alert('Confirmar', 'Excluir este cliente?', [
			{ text: 'Cancelar', style: 'cancel' },
			{
				text: 'Excluir',
				style: 'destructive',
				onPress: async () => {
					const nova = clientes.filter((c) => c.id !== id);
					await saveClientes(nova);
				},
			},
		]);
	};

	const renderItem = ({ item }: { item: Cliente }) => (
		<View style={styles.card}>
			<View style={styles.cardRow}>
				<Text style={styles.name}>{item.nome}</Text>
				<TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
					<Text style={styles.deleteText}>Excluir</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.sub}>{item.telefone}</Text>
			<Text style={styles.sub}>{item.endereco || '—'}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Cadastro de Clientes</Text>

			<View style={styles.form}>
				<Text style={styles.label}>Nome do cliente</Text>
				<TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex.: Maria Silva" />

				<Text style={styles.label}>Telefone (WhatsApp)</Text>
				<TextInput style={styles.input} value={telefone} onChangeText={setTelefone} placeholder="(XX) 9XXXX-XXXX" keyboardType="phone-pad" />

				<Text style={styles.label}>Endereço</Text>
				<TextInput style={[styles.input, styles.multiline]} value={endereco} onChangeText={setEndereco} placeholder="Rua, número, complemento" multiline />

				<TouchableOpacity style={styles.saveButton} onPress={onSave}>
					<Text style={styles.saveButtonText}>Salvar Cliente</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.sectionTitle}>Clientes cadastrados</Text>
			{clientes.length === 0 ? (
				<View style={styles.empty}><Text style={styles.emptyText}>Nenhum cliente cadastrado.</Text></View>
			) : (
				<FlatList data={clientes} keyExtractor={(i) => i.id} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 40 }} />
			)}
		</View>
	);
}
