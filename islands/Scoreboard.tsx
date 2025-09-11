import { useSignal } from "@preact/signals";

type Items = "hong" | "chung" | "round" | "fight";

const generateFightLog = (
  fightNumber: number,
  roundNumber: number,
  chungPoints: number,
  hongPoints: number,
) => {
  const log =
    `Fight ${fightNumber}, Round ${roundNumber}, Chung ${chungPoints}, Hong ${hongPoints}`;
  console.log(log);
  return log;
};

export default function Scoreboard() {
  const fightNumber = useSignal(1);
  const roundNumber = useSignal(1);
  const hongPoints = useSignal(0);
  const chungPoints = useSignal(0);

  const handleClick = (item: Items) => {
    item === "hong" && hongPoints.value++;
    item === "chung" && chungPoints.value++;

    if (item === "round") {
      if (confirm("Tem certeza que deseja iniciar o próximo round?")) {
        generateFightLog(
          fightNumber.value,
          roundNumber.value,
          chungPoints.value,
          hongPoints.value,
        );

        roundNumber.value++;
        hongPoints.value = 0;
        chungPoints.value = 0;
      }
    }

    if (item === "fight") {
      if (confirm("Tem certeza que deseja iniciar a próxima luta?")) {
        generateFightLog(
          fightNumber.value,
          roundNumber.value,
          chungPoints.value,
          hongPoints.value,
        );

        fightNumber.value++;
        roundNumber.value = 1;
        hongPoints.value = 0;
        chungPoints.value = 0;
      }
    }
  };

  const handleRightClick = (item: Items, e: MouseEvent) => {
    e.preventDefault();
    item === "hong" && hongPoints.value > 0 && hongPoints.value--;
    item === "chung" && chungPoints.value > 0 && chungPoints.value--;

    if (item === "round" && roundNumber.value > 1) {
      if (confirm("Tem certeza que deseja voltar a luta anterior?")) {
        roundNumber.value--;
        hongPoints.value = 0;
        chungPoints.value = 0;
      }
    }

    if (item === "fight" && fightNumber.value > 1) {
      if (confirm("Tem certeza que deseja voltar à luta anterior?")) {
        fightNumber.value--;
        roundNumber.value = 1;
        hongPoints.value = 0;
        chungPoints.value = 0;
      }
    }
  };

  return (
    <div class="w-screen h-screen flex text-[300px] select-none">
      <div
        id="hong"
        role="button"
        tabIndex={0}
        class="flex-1 h-full bg-red-600 hover:bg-red-500 flex items-center justify-center text-white"
        onClick={() => handleClick("hong")}
        onContextMenu={(e) => handleRightClick("hong", e)}
      >
        {hongPoints}
      </div>
      <div class="w-1/5 bg-black text-[50px] flex flex-col h-screen text-amber-50">
        <div
          class=" hover:bg-gray-900 w-full items-center text-center mb-auto py-10"
          onClick={() => handleClick("fight")}
          onContextMenu={(e) => handleRightClick("fight", e)}
        >
          <div>Fight</div>
          <div class="text-[100px]">{fightNumber}</div>
        </div>

        <div
          class="hover:bg-gray-900 w-full items-center text-center mt-auto py-10"
          onClick={() => handleClick("round")}
          onContextMenu={(e) => handleRightClick("round", e)}
        >
          <div>Round</div>
          <div class="text-[100px]">{roundNumber}</div>
        </div>
      </div>
      <div
        class="flex-1 h-full tabIndex={0} bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white"
        onClick={() => handleClick("chung")}
        onContextMenu={(e) => handleRightClick("chung", e)}
      >
        {chungPoints}
      </div>
    </div>
  );
}
