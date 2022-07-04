/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import Counter from '../islands/Counter.tsx';
import { Handlers, PageProps } from '$fresh/server.ts';

type Joke = string;

export const handler: Handlers<Joke | null> = {
  async GET(req: Request, ctx) {
    console.log(req);
    const url = req.url + 'api/joke';
    console.log(url);
    const resp = await fetch(url);
    if (resp.status === 404) {
      return ctx.render(null);
    }

    const joke: Joke = await resp.text();
    console.log(joke);
    return ctx.render(joke);
  },
};

export default function Home({ data }: PageProps<Joke>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />

      <p>{data}</p>

      <p class={tw`my-6`}>
        Welcome to `fresh`. Try update this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <Counter start={3} />
    </div>
  );
}
