import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolveDeployTarget } from '../src/lib/deploy-target.js';

const [target, action = 'build'] = process.argv.slice(2);
const env = { ...process.env, DEPLOY_TARGET: target };
resolveDeployTarget(env);
if (!['build', 'preview', 'test'].includes(action)) throw new Error(`Unknown action: ${action}`);
const args = action === 'test'
  ? ['--test', ...process.argv.slice(4)]
  : [`scripts/${action === 'preview' ? 'serve' : 'build'}.mjs`];
const result = spawnSync(process.execPath, args, { cwd: fileURLToPath(new URL('../', import.meta.url)), env, stdio: 'inherit' });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
