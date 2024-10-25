/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMutation, useQueryClient, type QueryKey } from '@tanstack/vue-query';

export function useOptimisticMutation<Q, P = any, K extends QueryKey = QueryKey>({
  queryKey,
  mutationFn,
  updateQueryFn
}: {
  queryKey: K
  mutationFn: (params: P) => Promise<void>
  updateQueryFn: (params: P, queryData?: Q) => Q | undefined
}) {
  const client = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (params: P) => {
      // block eventual queries on the provided query key
      await client.cancelQueries({ queryKey });

      // get snapshot
      const snapshot = client.getQueryData<Q>(queryKey);

      // locally update query
      // @ts-expect-error dunno
      client.setQueryData<Q>(queryKey, (old) => updateQueryFn(params, old));

      return { snapshot };
    },
    onError: (_, __, context) => {
      // rollback snapshot
      if (context !== undefined) {
        // @ts-expect-error dunno
        client.setQueryData(queryKey, context.snapshot);
      }
    },
    onSettled: async () => {
      // invalidate query
      await client.invalidateQueries({ queryKey });
    }
  });
}
