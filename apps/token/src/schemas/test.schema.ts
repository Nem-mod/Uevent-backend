import { Schema } from 'redis-om';

export const TestSchema = new Schema(
  'test-schema',
  {
    test: { type: 'string' },
  },
  {
    dataStructure: 'HASH',
  },
);
