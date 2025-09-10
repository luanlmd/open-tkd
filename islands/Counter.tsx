import { useSignal } from "@preact/signals";
import { Button } from "../components/Button.tsx";

export default function Counter() {
  const count = useSignal(0);

  console.log("Counter rendered");

  return (
    <div class="flex gap-8 py-6">
      <Button id="decrement" onClick={() => count.value -= 1}>-1</Button>
      <p class="text-3xl tabular-nums">{count}</p>
      <Button id="increment" onClick={() => count.value += 1}>+1</Button>
    </div>
  );
}
