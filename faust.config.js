import { setConfig } from '@faustwp/core';
import templates from './wp-templates';
import possibleTypes from './possibleTypes.json';

setConfig({
  wpUrl: 'http://headless-wordpress.local',
  // apiClientSecret: process.env.WP_HEADLESS_SECRET,
  // apiClientId: process.env.WP_HEADLESS_CLIENT_ID,
  templates,
  plugins: [],
  experimental: {
    useRestApi: true, // Habilita REST API en lugar de GraphQL
  },
  // experimentalToolbar: true,
  possibleTypes,
});

export default {
  wpUrl: 'http://headless-wordpress.local',
  experimental: {
    useRestApi: true, // Redundancia para asegurarte de que REST API esté activo
  },
  // apiClientSecret: process.env.WP_HEADLESS_SECRET,
  // apiClientId: process.env.WP_HEADLESS_CLIENT_ID,
};