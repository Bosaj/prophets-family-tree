import { test, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

test('prophets-family-tree package.json integrity', () => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'));
  expect(pkg.name || pkg.version).toBeTruthy();
});
