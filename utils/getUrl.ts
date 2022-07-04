import { HandlerContext } from '$fresh/server.ts';

export const GetFromHandler = async (
  req: Request,
  ctx: HandlerContext,
  handler: (_req: Request, _ctx: HandlerContext) => Response
) => {
  const response = handler(req, ctx);
  const decoded = new TextDecoder().decode(
    (await response.body?.getReader().read())?.value
  );

  try {
    return JSON.parse(decoded);
  } catch {
    return { text: decoded };
  }
};
