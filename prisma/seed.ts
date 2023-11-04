import user from './seed/user';
import { soft } from './seed/soft';
import comment from './seed/comment';

async function run() {
  await user();
  await soft();
  await comment();
}

run();
