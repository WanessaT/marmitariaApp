import { styles } from '@/styles/gastos.styles';
import { Gasto } from '@/utils/types/gastos.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';



const STORAGE_KEY = '@gastos_marmitaria';

function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function formatDateDDMMYYYY(iso?: string) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  } catch {
    return iso;
  }
}

function parseDateFromDDMMYYYY(input?: string) {
  if (!input) return null;
  const s = input.trim();
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const dd = Number(m[1]);
    const mm = Number(m[2]);
    const yyyy = Number(m[3]);
    const d = new Date(yyyy, mm - 1, dd);
    if (d.getFullYear() === yyyy && d.getMonth() === mm - 1 && d.getDate() === dd) {
      return d.toISOString();
    }
    return null;
  }
  try {
    const alt = new Date(s);
    if (!isNaN(alt.getTime())) return alt.toISOString();
  } catch {}
  return null;
}

function formatDateInput(value: string) {
  // remove non-digits
  const digits = (value || '').replace(/\D+/g, '').slice(0, 8);
  const parts = [] as string[];
  if (digits.length >= 2) {
    parts.push(digits.slice(0, 2));
    if (digits.length >= 4) {
      parts.push(digits.slice(2, 4));
      if (digits.length > 4) {
        parts.push(digits.slice(4));
      }
    } else if (digits.length > 2) {
      parts.push(digits.slice(2));
    }
  } else if (digits.length > 0) {
    parts.push(digits);
  }
  return parts.join('/');
}

export default function GastosScreen() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState<string>('');
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [saving, setSaving] = useState(false);

  const loadGastos = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const list: Gasto[] = raw ? JSON.parse(raw) : [];
      setGastos(list);
    } catch (err) {
      console.error('Erro ao carregar gastos', err);
      setGastos([]);
    }
  }, []);

  useEffect(() => {
    loadGastos();
  }, [loadGastos]);

  const saveList = async (list: Gasto[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setGastos(list);
  };

  const onRegister = async () => {
    if (!descricao.trim()) {
      Alert.alert('Validação', 'Informe a descrição do gasto.');
      return;
    }
    const v = parseFloat(String(valor).replace(',', '.'));
    if (isNaN(v) || v <= 0) {
      Alert.alert('Validação', 'Informe um valor válido maior que 0.');
      return;
    }

    // compute ISO date to store: prefer user input (DD/MM/AAAA), fallback to now
    let dataIso = new Date().toISOString();
    if (data && data.trim()) {
      const parsed = parseDateFromDDMMYYYY(data);
      if (parsed) {
        dataIso = parsed;
      } else {
        Alert.alert('Data inválida', 'Informe a data no formato DD/MM/AAAA ou deixe em branco.');
        return;
      }
    }

    const gasto: Gasto = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: Number(v.toFixed(2)),
      data: dataIso,
    };

    try {
      setSaving(true);
      const nova = [gasto, ...gastos];
      await saveList(nova);
      setDescricao('');
      setValor('');
      setData('');
    } catch (err) {
      console.error('Erro ao salvar gasto', err);
      Alert.alert('Erro', 'Não foi possível registrar o gasto.');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = (id: string) => {
    Alert.alert('Confirmar', 'Excluir este gasto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const nova = gastos.filter((g) => g.id !== id);
          await saveList(nova);
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Gasto }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.desc}>{item.descricao}</Text>
        <Text style={styles.valor}>{formatBRL(item.valor)}</Text>
      </View>
      <View style={styles.cardRowBottom}>
        <Text style={styles.date}>{formatDateDDMMYYYY(item.data)}</Text>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Gastos</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Ex.: Arroz" />

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput style={styles.input} value={valor} onChangeText={setValor} keyboardType="numeric" placeholder="0,00" />

        <Text style={styles.label}>Data (opcional)</Text>
        <TextInput
          style={styles.input}
          value={data}
          onChangeText={(t) => setData(formatDateInput(t))}
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
          maxLength={10}
        />

        <TouchableOpacity style={styles.saveButton} onPress={onRegister} disabled={saving}>
          <Text style={styles.saveButtonText}>{saving ? 'Registrando...' : 'Registrar Gasto'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Gastos registrados</Text>
      {gastos.length === 0 ? (
        <View style={styles.empty}><Text style={styles.emptyText}>Nenhum gasto registrado.</Text></View>
      ) : (
        <FlatList data={gastos} keyExtractor={(i) => i.id} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 40 }} />
      )}
    </View>
  );
}


