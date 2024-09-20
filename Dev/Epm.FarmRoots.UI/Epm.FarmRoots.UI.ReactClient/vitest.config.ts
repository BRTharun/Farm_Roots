import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['src/components/__tests__/**/*.{js,jsx,ts,tsx}', 'src/components/__tests__/**/*.spec.{js,jsx,ts,tsx}'],
    exclude: ['node_modules', 'dist',
      'src/**/*.config.{js,ts}', // Exclude config files
      'src/**/index.{js,ts}',     // Exclude index files if needed
      'src/**/*.test.{js,ts}',    // Exclude test files
      'src/**/*.spec.{js,ts}',    // Exclude spec files if any
      '**/node_modules/**',        // Exclude node_modules
      'src/**/test/**',            // Exclude any test directories
      'src/**/*.{spec,test}.{js,ts}', // Exclude specific test file types
      'src/**/some-folder/**', 
    ],
    coverage: {
      reporter: ['text', 'json', 'html', 'text-summary'],
      include: ['src/**/*.{js,ts,jsx,tsx}'], // Ensure this includes all your relevant files
      exclude: ['**/*.spec.ts', '**/*.test.ts', 'src/components/__tests__/**',  'src/vite-env.d.ts','src/components/types', 'src/components/store','src/components/utils',
        'src/components/services'
      ],
    },
  },
});
