import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    'src/generated/graphql/types.ts': {
      schema: ['src/core/graphql/schema.graphql', 'src/feature/vendor/graphql/schema.graphql'],
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
