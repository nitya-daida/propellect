import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';

const dir = process.cwd();
const gitDir = path.join(dir, '.git');
if (fs.existsSync(gitDir)) {
  console.log('Repository already initialized.');
  process.exit(0);
}

await git.init({ fs, dir });

const ignoreDirs = new Set(['node_modules', 'dist', '.git']);
const ignoreFiles = new Set(['npm-debug.log', 'yarn-debug.log', 'yarn-error.log']);

async function walk(currentDir) {
  const entries = await fs.promises.readdir(currentDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    const relative = path.relative(dir, fullPath).replace(/\\/g, '/');
    if (ignoreDirs.has(entry.name) || ignoreFiles.has(entry.name)) continue;
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (entry.isFile()) {
      if (relative === 'init-git.mjs') continue;
      await git.add({ fs, dir, filepath: relative });
      console.log('added', relative);
    }
  }
}

await walk(dir);
await git.commit({
  fs,
  dir,
  message: 'Initial commit',
  author: { name: 'Nitya Daida', email: 'nitya@propellect.com' },
});
console.log('Initialized local git repository with initial commit.');
