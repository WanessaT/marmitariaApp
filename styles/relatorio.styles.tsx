import { StyleSheet } from "react-native";

export 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0f172a',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  largeCard: {
    marginTop: 6,
  },
  cardLabel: {
    color: '#475569',
    fontSize: 14,
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  cardValueLarge: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0b4a6f',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#ef4444',
  },
  shareButton: {
    backgroundColor: '#2563eb',
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
  },
});
