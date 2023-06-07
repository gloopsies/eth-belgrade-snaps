import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'get':
      return get();
    case 'save':
      return save(request.params);
    default:
      throw new Error('Method not found.');
  }
};

const save = async (id: any) => {
  return snap.request({
    method: 'snap_manageState',
    params: { operation: 'update', newState: { identity: id } },
  });
}

const get = async () => {
  const data = await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' },
  });

  return data?.identity ?? null
}