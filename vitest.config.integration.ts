import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    fileParallelism: true,
    setupFiles: ['./test/config/integration/setup.ts'],
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
        'src/server',
        'src/infra/web3',
        'src/middleware.ts',
        'src/scripts',
        'src/types',
      ],
      clean: true,
      reportsDirectory: './coverage',
      reporter: [['text-summary'], ['lcov', { file: 'unit/lcov.info' }]],
    },
    hookTimeout: 120_000,
    include: [
      'test/integration/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: ['test/unit/**/*'],
  },
  resolve: {
    alias: {
      '@domain': path.resolve(process.cwd(), './src/domain'),
      '@frontend': path.resolve(process.cwd(), './src/frontend'),
      '@server': path.resolve(process.cwd(), './src/server'),
    },
  },
});
