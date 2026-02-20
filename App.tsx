// Antigravity — Main App Entry Point
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import './src/i18n';

const AppContent = () => {
  const { mode } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <RootNavigator />
    </NavigationContainer>
  );
};

interface AppErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
    message: '',
  };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'Unknown error',
    };
  }

  componentDidCatch(error: Error) {
    console.error('App crashed:', error);
  }

  handleRetry = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.crashContainer}>
          <Text style={styles.crashTitle}>Something went wrong</Text>
          <Text style={styles.crashMessage}>{this.state.message}</Text>
          <TouchableOpacity style={styles.crashButton} onPress={this.handleRetry}>
            <Text style={styles.crashButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <AppErrorBoundary>
        <AppContent />
      </AppErrorBoundary>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  crashContainer: {
    flex: 1,
    backgroundColor: '#0F0E1A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  crashTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  crashMessage: {
    color: '#A9A9C8',
    fontSize: 14,
    textAlign: 'center',
  },
  crashButton: {
    marginTop: 8,
    backgroundColor: '#6C5CE7',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  crashButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
