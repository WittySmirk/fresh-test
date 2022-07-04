/** @jsx h */
import { h } from 'preact';
import { Handlers, PageProps, HandlerContext } from '$fresh/server.ts';
import { GetFromHandler } from 'getUrl';
import { handler as jokeHandler } from './api/joke.ts';

type Joke = string;
export const handler: Handlers = {
  // async GET(req, ctx) {
  //   // console.log(req.headers.get('host'));
  //   // console.log(GetUrl(req, '/api/joke'));
  //   // const url = 'http://' + req.headers.get('host')?.toString() + '/api/joke';
  //   // console.log(url);
  //   const resp = await fetch(GetUrl(req, '/api/joke'));
  //   if (resp.status === 404) {
  //     return ctx.render(null);
  //   }
  //   const joke: Joke = await resp.text();
  //   console.log(joke);
  //   return ctx.render(joke);
  // },

  async GET(req, ctx: HandlerContext) {
    const bruh = jokeHandler(req, ctx);
    // const b = await a.body?.getReader().read();
    // const c = await b.value;
    // const decoded = new TextDecoder().decode(c);
    // const joke = decoded;
    // const j = new TextDecoder().decode(
    //   (await bruh.body?.getReader().read()).value
    // );
    const j = await GetFromHandler(req, ctx, jokeHandler);

    // console.log(j);

    const joke = j;
    return ctx.render(joke);
  },
};

export default function Test({ data }: PageProps<Joke>) {
  return <p>{data}</p>;
}
