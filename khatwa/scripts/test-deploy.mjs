import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cwd = fileURLToPath(new URL('../', import.meta.url));
const run = (args, target) => {
  const result = spawnSync(process.execPath, args, { cwd, env: { ...process.env, DEPLOY_TARGET: target }, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${target}: ${args.join(' ')} failed`);
};
run(['scripts/build.mjs'], 'github');
run(['--test', ...fs.readdirSync(new URL('../tests/', import.meta.url)).filter(file => file.endsWith('.test.mjs')).map(file => 'tests/' + file)], 'github');
run(['scripts/build.mjs'], 'cloudflare-preview');
run(['--test', ...fs.readdirSync(new URL('../tests/', import.meta.url)).filter(file => file.endsWith('.test.mjs') && file !== 'seo.test.mjs').map(file => 'tests/' + file)], 'cloudflare-preview');
// Leave the historical default artifact in dist after the matrix.
run(['scripts/build.mjs'], 'github');
