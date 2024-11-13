import { Metrics } from 'react-native-metrics';

// Initialize metrics with design specifications
export const metrics = new Metrics({
  designWidth: 375, // Standard iPhone design width
  designHeight: 812, // Standard iPhone design height
});

// Utility functions
export const { vw, vh, vmin, vmax, rem } = metrics;
