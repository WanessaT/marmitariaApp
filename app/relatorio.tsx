import { styles } from '@/styles/relatorio.styles';
import { Pedido } from '@/utils/types/relatorio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Share, Text, TouchableOpacity, View } from 'react-native';


function isSameMonthISO(isoDate: string) {
  try {
    const d = new Date(isoDate);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  } catch {
    return false;
  }
}

export default function RelatorioScreen() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(false);
  const [precoSimples, setPrecoSimples] = useState<number>(15);
  const [precoCompleta, setPrecoCompleta] = useState<number>(20);
  const [gastosTotal, setGastosTotal] = useState<number>(0);

  const loadPedidos = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem('pedidos');
      const lista: Pedido[] = raw ? JSON.parse(raw) : [];
      const desteMes = lista.filter((p) => isSameMonthISO(p.criadoEm));
      setPedidos(desteMes);
      // tentar carregar preços configurados
      try {
        const ps = await AsyncStorage.getItem('@preco_simples');
        const pc = await AsyncStorage.getItem('@preco_completa');
        if (ps) setPrecoSimples(parseFloat(ps.toString().replace(',', '.')) || precoSimples);
        if (pc) setPrecoCompleta(parseFloat(pc.toString().replace(',', '.')) || precoCompleta);
      } catch (e) {
        console.warn('Erro ao carregar preços do AsyncStorage', e);
      }
    } catch (err) {
      console.error('Erro ao carregar pedidos para relatório', err);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
      // carregar gastos do mês
      try {
        const rawG = await AsyncStorage.getItem('@gastos_marmitaria');
        const gastosList: { valor: number; data?: string }[] = rawG ? JSON.parse(rawG) : [];
        // filtrar apenas do mês atual
        const gastosDoMes = gastosList.filter((g) => {
          try {
            return isSameMonthISO(g.data || new Date().toISOString());
          } catch {
            return false;
          }
        });
        const totalG = gastosDoMes.reduce((s, g) => s + (Number(g.valor) || 0), 0);
        setGastosTotal(Number(totalG.toFixed(2)));
      } catch (e) {
        console.warn('Erro ao carregar gastos', e);
        setGastosTotal(0);
      }
  }, []);

  useEffect(() => {
    loadPedidos();
  }, [loadPedidos]);

  const totals = React.useMemo(() => {
    const totalPedidos = pedidos.length;
    const totalMarmitas = pedidos.reduce((s, p) => s + (p.quantidade || 0), 0);
    // prefer values saved per pedido (valorTotal) when present, otherwise fallback to configured prices
    const totalValor = pedidos.reduce((s, p) => {
      if (typeof p.valorTotal === 'number') return s + p.valorTotal;
      const price = p.tipo === 'completa' ? precoCompleta : precoSimples;
      return s + (p.quantidade || 0) * price;
    }, 0);
    return { totalPedidos, totalMarmitas, totalValor };
  }, [pedidos, precoCompleta, precoSimples]);

  const lucroEstimado = React.useMemo(() => {
    return Number((totals.totalValor - gastosTotal).toFixed(2));
  }, [totals.totalValor, gastosTotal]);

  const clearMonth = async () => {
    Alert.alert('Confirmar', 'Remover todos os pedidos deste mês?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            const raw = await AsyncStorage.getItem('pedidos');
            const lista: Pedido[] = raw ? JSON.parse(raw) : [];
            const restante = lista.filter((p) => !isSameMonthISO(p.criadoEm));
            await AsyncStorage.setItem('pedidos', JSON.stringify(restante));
            setPedidos([]);
            Alert.alert('Removido', 'Pedidos do mês removidos.');
          } catch (err) {
            console.error(err);
            Alert.alert('Erro', 'Não foi possível remover os pedidos.');
          }
        },
      },
    ]);
  };

  const generateTextReport = async () => {
    const { totalPedidos, totalMarmitas, totalValor } = totals;
    const report = `Relatório Mensal\n\nTotal de pedidos: ${totalPedidos}\nTotal de marmitas: ${totalMarmitas}\nValor estimado: R$ ${totalValor.toFixed(2)}\nTotal de Gastos: R$ ${gastosTotal.toFixed(2)}\nLucro Estimado: R$ ${lucroEstimado.toFixed(2)}`;
    try {
      await Share.share({ message: report, title: 'Relatório Mensal' });
    } catch (err) {
      console.error('Erro ao compartilhar', err);
      Alert.alert('Relatório', report);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório Mensal</Text>

      <View style={styles.cardsRow}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total de pedidos</Text>
          <Text style={styles.cardValue}>{loading ? '—' : totals.totalPedidos}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total de marmitas</Text>
          <Text style={styles.cardValue}>{loading ? '—' : totals.totalMarmitas}</Text>
        </View>
      </View>

      <View style={[styles.card, styles.largeCard]}>
        <Text style={styles.cardLabel}>Valor estimado (R$)</Text>
        <Text style={styles.cardValueLarge}>{loading ? '—' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totals.totalValor)}</Text>
      </View>

      <View style={styles.cardsRow}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total de Gastos (R$)</Text>
          <Text style={styles.cardValue}>{loading ? '—' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gastosTotal)}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Lucro Estimado (R$)</Text>
          <Text style={styles.cardValue}>{loading ? '—' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lucroEstimado)}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionButton, styles.clearButton]} onPress={clearMonth}>
          <Text style={styles.actionText}>Limpar dados do mês</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.shareButton]} onPress={generateTextReport}>
          <Text style={styles.actionText}>Gerar relatório em texto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
