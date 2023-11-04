import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    name: 'configure',
    app_key: 'codersx',
    // soft_limit: 10,
  };
});
