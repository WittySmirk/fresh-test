/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import Counter from '../islands/Counter.tsx';
import { Handlers, PageProps } from '$fresh/server.ts';

type Joke = string;

export const handler: Handlers<Joke | null> = {
  async GET(_, ctx) {
    const resp = await fetch('http://localhost:8000/api/joke');
    if (resp.status === 404) {
      return ctx.render(null);
    }

    // console.log(await resp.text());
    const joke: Joke = await resp.text();
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
