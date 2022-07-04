/** @jsx h */
import { h } from 'preact';
import { Handlers, PageProps } from '$fresh/server.ts';
import GetUrl from 'getUrl';

type Joke = string;
export const handler: Handlers<Joke | null> = {
  async GET(req, ctx) {
    // console.log(req.headers.get('host'));
    // console.log(GetUrl(req, '/api/joke'));
    // const url = 'http://' + req.headers.get('host')?.toString() + '/api/joke';
    // console.log(url);
    const resp = await fetch(GetUrl(req, '/api/joke'));
    if (resp.status === 404) {
      return ctx.render(null);
    }

    const joke: Joke = await resp.text();
    console.log(joke);
    return ctx.render(joke);
  },
};

export default function Test({ data }: PageProps<Joke>) {
  return <p>{data}</p>;
}
