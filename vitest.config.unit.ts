import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./test/config/unit/setup.ts'],
    fileParallelism: true,
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: [
        'src/app',
        'src/frontend',
        'src/infra/auth',
        'src/infra/config',
        'src/infra/db',
        'src/infra/db/repositories',
        'src/infra/messaging',
        'src/infra/web3',
        'src/middleware.ts',
        'src/scripts',
        'src/types',
      ],
      clean: true,
      reportsDirectory: './coverage',
      reporter: [['text-summary'], ['lcov', { file: 'unit/lcov.info' }]],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    include: ['test/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['test/integration/**/*'],
  },
  resolve: {
    alias: {
      '@domain': path.resolve(process.cwd(), './src/domain'),
      '@frontend': path.resolve(process.cwd(), './src/frontend'),
      '@server': path.resolve(process.cwd(), './src/server'),
    },
  },
});
