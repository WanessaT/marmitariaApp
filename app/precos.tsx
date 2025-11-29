import { styles } from '@/styles/precos.styles';
import { formatBRL } from '@/utils/masks/formatBRL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ConfiguracaoPrecos() {
	const [precoPequena, setPrecoPequena] = useState<string>('12');
	const [precoGrande, setPrecoGrande] = useState<string>('15');
	const [precoMista, setPrecoMista] = useState<string>('17');
	const [saving, setSaving] = useState(false);

	const KEY_PEQUENA = '@preco_pequena';
	const KEY_GRANDE = '@preco_grande';
	const KEY_MISTA = '@preco_mista';

	const load = useCallback(async () => {
		try {
			const precoPequena = await AsyncStorage.getItem(KEY_PEQUENA);
			const precoGrande = await AsyncStorage.getItem(KEY_GRANDE);
			const precoMista = await AsyncStorage.getItem(KEY_MISTA);
			if (precoPequena !== null) setPrecoPequena(precoPequena);
			if (precoGrande !== null) setPrecoGrande(precoGrande);
			if (precoMista !== null) setPrecoMista(precoMista);
		} catch (err) {
			console.error('Erro ao carregar preços', err);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const onSave = async () => {
		const p = parseFloat(precoPequena.toString().replace(',', '.'));
		const g = parseFloat(precoGrande.toString().replace(',', '.'));
		const m = parseFloat(precoMista.toString().replace(',', '.'));
		if (isNaN(p) || isNaN(g) || isNaN(m) || p <= 0 || g <= 0 || m <= 0) {
			Alert.alert('Validação', 'Informe valores numéricos válidos maiores que 0.');
			return;
		}

		try {
			setSaving(true);
			await AsyncStorage.setItem(KEY_PEQUENA, String(p));
			await AsyncStorage.setItem(KEY_GRANDE, String(g));
			await AsyncStorage.setItem(KEY_MISTA, String(m));
			Alert.alert('Sucesso', 'Preços salvos com sucesso.');
		} catch (err) {
			console.error('Erro ao salvar preços', err);
			Alert.alert('Erro', 'Não foi possível salvar os preços.');
		} finally {
			setSaving(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Configuração de Preços</Text>

			<Text style={styles.note}>Altere aqui os valores das marmitas.</Text>

			<Text style={styles.label}>Valor da marmita simples (R$)</Text>
			<TextInput
				style={styles.input}
				value={precoPequena}
				onChangeText={setPrecoPequena}
				keyboardType="numeric"
				placeholder="12"
			/>
			<Text style={styles.currentPrice}>Preço atual: {formatBRL(precoPequena)}</Text>

			<Text style={styles.label}>Valor da marmita completa (R$)</Text>
			<TextInput
				style={styles.input}
				value={precoGrande}
				onChangeText={setPrecoGrande}
				keyboardType="numeric"
				placeholder="15"
			/>
			<Text style={styles.currentPrice}>Preço atual: {formatBRL(precoGrande)}</Text>

			<Text style={styles.label}>Valor da marmita mista (R$)</Text>
			<TextInput
				style={styles.input}
				value={precoMista}
				onChangeText={setPrecoMista}
				keyboardType="numeric"
				placeholder="18"
			/>
			<Text style={styles.currentPrice}>Preço atual: {formatBRL(precoMista)}</Text>

			<TouchableOpacity style={styles.saveButton} onPress={onSave} disabled={saving}>
				<Text style={styles.saveButtonText}>{saving ? 'Salvando...' : 'Salvar preços'}</Text>
			</TouchableOpacity>
		</View>
	);
}
