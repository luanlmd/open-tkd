import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import Scoreboard from "../islands/Scoreboard.tsx";

export default define.page(function About() {
  return (
    <>
      <Head>
        <title>Open TKD Scoreboard</title>
      </Head>
      <Scoreboard />
    </>
  );
});
