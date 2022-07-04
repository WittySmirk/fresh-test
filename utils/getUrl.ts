import { HandlerContext } from '$fresh/server.ts';

export const GetUrl = (req: Request, route: string): string => {
  return 'http://' + req.headers.get('host') + route;
};

export const GetFromHandler = async (
  req: Request,
  ctx: HandlerContext,
  handler: (_req: Request, _ctx: HandlerContext) => Response
) => {
  const response = handler(req, ctx);
  const decoded = new TextDecoder().decode(
    (await response.body?.getReader().read())?.value
  );

  return decoded;
};
