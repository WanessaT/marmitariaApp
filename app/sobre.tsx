import { styles } from '@/styles/sobre.styles';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function SobreProjeto() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Sobre o Projeto - Dona Panela Marmitaria</Text>

			<View style={styles.paragraph}>
				<Text style={styles.icon}>🎯</Text>
				<Text style={styles.text}>
					Este aplicativo foi desenvolvido como projeto de extensão com objetivo social e educacional. Ele nasceu
					para apoiar pequenas empresas locais com soluções simples e práticas.
				</Text>
			</View>

			<View style={styles.paragraph}>
				<Text style={styles.icon}>📍</Text>
				<Text style={styles.text}>
					O foco é ajudar uma marmitaria localizada no bairro Jardim das Oliveiras, em Fortaleza. A equipe local
					enfrentava dificuldades com controles manuais de pedidos e estoque.
				</Text>
			</View>

			<View style={styles.paragraph}>
				<Text style={styles.icon}>⚠️</Text>
				<Text style={styles.text}>
					A principal dificuldade do negócio era o controle manual: registro de pedidos em papel, perda de dados
					e inconsistência no estoque, o que trazia retrabalho e desperdício.
				</Text>
			</View>

			<View style={styles.paragraph}>
				<Text style={styles.icon}>✅</Text>
				<Text style={styles.text}>
					Com o aplicativo, agora é possível:
					{'\n'}- Registrar pedidos facilmente
					{'\n'}- Controlar o estoque de insumos
					{'\n'}- Acompanhar relatórios de vendas
					{'\n'}- Organizar informações de clientes
				</Text>
			</View>

			<View style={styles.paragraph}>
				<Text style={styles.icon}>💡</Text>
				<Text style={styles.text}>
					O design prioriza simplicidade, legibilidade e usabilidade no dia-a-dia da marmitaria. Este projeto é
					uma base que pode ser expandida com novas funcionalidades conforme a necessidade do negócio.
				</Text>
			</View>
		</ScrollView>
	);
}

