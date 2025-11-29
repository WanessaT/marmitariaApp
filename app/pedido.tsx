import { styles } from '@/styles/pedido.styles';
import { MarmitaType } from '@/utils/types/pedido.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';



export default function PedidoScreen() {
	const [nome, setNome] = useState('');
	const [tipo, setTipo] = useState<MarmitaType>('pequena');
	const [quantidade, setQuantidade] = useState('1');
	const [pagamento, setPagamento] = useState('');
	const [observacoes, setObservacoes] = useState('');
	const [saving, setSaving] = useState(false);

	const savePedido = async () => {
		if (!nome.trim()) {
			Alert.alert('Validação', 'Por favor informe o nome do cliente.');
			return;
		}

		const qtd = parseInt(quantidade, 10);
		if (isNaN(qtd) || qtd <= 0) {
			Alert.alert('Validação', 'Informe uma quantidade válida.');
			return;
		}

		let precoPequena = 12;
		let precoGrande = 15;
		let precoMista = 18;
		try {
			const ps = await AsyncStorage.getItem('@preco_pequena');
			const pc = await AsyncStorage.getItem('@preco_grande');
			const pm = await AsyncStorage.getItem('@preco_mista');
			if (ps) precoPequena = parseFloat(ps.toString().replace(',', '.')) || precoPequena;
			if (pc) precoGrande = parseFloat(pc.toString().replace(',', '.')) || precoGrande;
			if (pm) precoMista = parseFloat(pm.toString().replace(',', '.')) || precoMista;
		} catch (e) {
			console.warn('Erro ao ler preços salvos', e);
		}

		const unitPrice = tipo === 'grande' ? precoGrande : tipo === 'mista' ? precoMista : precoPequena;
		const novo = {
			id: Date.now().toString(),
			nome: nome.trim(),
			tipo,
			quantidade: qtd,
			pagamento: pagamento.trim(),
			observacoes: observacoes.trim(),
			valorUnitario: unitPrice,
			valorTotal: Number((unitPrice * qtd).toFixed(2)),
			criadoEm: new Date().toISOString(),
		};

		try {
			setSaving(true);
			const raw = await AsyncStorage.getItem('pedidos');
			const lista = raw ? JSON.parse(raw) : [];
			lista.unshift(novo);
			await AsyncStorage.setItem('pedidos', JSON.stringify(lista));
			setNome('');
			setTipo('pequena');
			setQuantidade('1');
			setPagamento('');
			setObservacoes('');
			Alert.alert('Sucesso', 'Pedido salvo com sucesso!');
		} catch (err) {
			console.error(err);
			Alert.alert('Erro', 'Não foi possível salvar o pedido.');
		} finally {
			setSaving(false);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
			<Text style={styles.title}>Cadastro de Pedido</Text>

			<Text style={styles.label}>Nome do cliente</Text>
			<TextInput
				style={styles.input}
				value={nome}
				onChangeText={setNome}
				placeholder="Ex.: João Silva"
				accessibilityLabel="nome-cliente"
			/>

			<Text style={styles.label}>Tipo de marmita</Text>
			<View style={styles.row}> 
				<TouchableOpacity
					style={[styles.typeButton, tipo === 'pequena' && styles.typeButtonActive]}
					onPress={() => setTipo('pequena')}
				>
					<Text style={[styles.typeText, tipo === 'pequena' && styles.typeTextActive]}>Pequena</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.typeButton, tipo === 'grande' && styles.typeButtonActive]}
					onPress={() => setTipo('grande')}
				>
					<Text style={[styles.typeText, tipo === 'grande' && styles.typeTextActive]}>Grande</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.typeButton, tipo === 'mista' && styles.typeButtonActive]}
					onPress={() => setTipo('mista')}
				>
					<Text style={[styles.typeText, tipo === 'mista' && styles.typeTextActive]}>Mista</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.label}>Quantidade</Text>
			<TextInput
				style={styles.input}
				value={quantidade}
				onChangeText={setQuantidade}
				keyboardType="numeric"
				placeholder="1"
			/>

			<Text style={styles.label}>Forma de pagamento</Text>
			<TextInput
				style={styles.input}
				value={pagamento}
				onChangeText={setPagamento}
				placeholder="Ex.: Dinheiro / Cartão"
			/>

			<Text style={styles.label}>Observações</Text>
			<TextInput
				style={[styles.input, styles.multiline]}
				value={observacoes}
				onChangeText={setObservacoes}
				placeholder="Observações..."
				multiline
				numberOfLines={4}
			/>

			<TouchableOpacity style={styles.saveButton} onPress={savePedido} disabled={saving}>
				<Text style={styles.saveButtonText}>{saving ? 'Salvando...' : 'Salvar pedido'}</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}


