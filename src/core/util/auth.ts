import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { Context } from '../types/context';

export function authDirective(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0];
      if (!authDirective) return fieldConfig;

      const { resolve = defaultFieldResolver } = fieldConfig;

      fieldConfig.resolve = async function (source, args, context: Context, info) {
        if (!context.user) {
          throw new Error('Authentication required');
        }
        return resolve(source, args, context, info);
      };

      return fieldConfig;
    },
  });
}
