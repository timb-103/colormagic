import { type H3Event } from 'h3';
import { betterAjvErrors } from '@apideck/better-ajv-errors';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Value } from '@sinclair/typebox/value';
import { TypeGuard, type Static, type TSchema } from '@sinclair/typebox';

let instance: Ajv;
let instanceWithFormats: Ajv;

function schemaOf(schemaOf2: string, value: unknown, schema: unknown): boolean {
  switch (schemaOf2) {
    case 'Constructor':
      return TypeGuard.IsConstructor(schema) && Value.Check(schema, value);
    case 'Function':
      return TypeGuard.IsFunction(schema) && Value.Check(schema, value);
    case 'Date':
      return TypeGuard.IsDate(schema) && Value.Check(schema, value);
    case 'Promise':
      return TypeGuard.IsPromise(schema) && Value.Check(schema, value);
    case 'Uint8Array':
      return TypeGuard.IsUint8Array(schema) && Value.Check(schema, value);
    case 'Undefined':
      return TypeGuard.IsUndefined(schema) && Value.Check(schema, value);
    case 'Void':
      return TypeGuard.IsVoid(schema) && Value.Check(schema, value);
    default:
      return false;
  }
}

interface ValidatorOptions {
  includeAjvFormats?: boolean
}

function useValidator(options: ValidatorOptions = {}): Ajv {
  if (options.includeAjvFormats === true) {
    if (instanceWithFormats === undefined) {
      instanceWithFormats = addFormats(new Ajv({
        keywords: ['kind', 'modifier']
      }), {
        mode: 'fast',
        formats: [
          'date-time',
          'time',
          'date',
          'email',
          'uri',
          'uri-reference'
        ]
      })
        .addKeyword({ type: 'object', keyword: 'instanceOf', validate: schemaOf })
        .addKeyword({ type: 'null', keyword: 'typeOf', validate: schemaOf })
        .addKeyword('exclusiveMinimumTimestamp')
        .addKeyword('exclusiveMaximumTimestamp')
        .addKeyword('minimumTimestamp')
        .addKeyword('maximumTimestamp')
        .addKeyword('minByteLength')
        .addKeyword('maxByteLength');
    }
    return instanceWithFormats;
  } else if (instance === undefined) {
    instance = new Ajv({
      keywords: ['kind', 'modifier']
    });
  }
  return instance;
}

async function validateBody<T extends TSchema>(event: H3Event, schema: T, options?: ValidatorOptions): Promise<Static<T, []>> {
  const body = await readBody(event);
  const validate = useValidator(options).compile(schema);
  if (!validate(body)) {
    const betterErrors = betterAjvErrors({ schema, data: body, errors: validate.errors, basePath: 'body' });
    throw createError({ statusCode: 400, statusMessage: betterErrors[0].message });
  }
  return body;
}

export function validateQuery<T extends TSchema>(event: H3Event, schema: T, options?: ValidatorOptions): Static<T, []> {
  const query = getQuery(event);
  const validate = useValidator(options).compile(schema);

  if (!validate(query)) {
    const betterErrors = betterAjvErrors({ schema, data: query, errors: validate.errors, basePath: 'query' });
    throw createError({ statusCode: 400, statusMessage: betterErrors[0].message });
  }

  return query as Static<T>;
}

export function validateParams<T extends TSchema>(event: H3Event, schema: T, options?: ValidatorOptions): Static<T, []> {
  const query = getRouterParams(event);
  const validate = useValidator(options).compile(schema);

  if (!validate(query)) {
    const betterErrors = betterAjvErrors({ schema, data: query, errors: validate.errors, basePath: 'params' });
    throw createError({ statusCode: 400, statusMessage: betterErrors[0].message });
  }

  return query as Static<T>;
}

export { validateBody };
