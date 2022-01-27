import type { ResponsePromise } from 'ky';

type CustomResponsePromise<JSON extends Record<string, unknown>> = Omit<
  ResponsePromise,
  'json'
> & {
  json: () => Promise<JSON>;
};

export type PostCaller<
  Body extends Record<string, unknown>,
  Response extends Record<string, unknown>
> = (payload: Body) => CustomResponsePromise<Response>;
