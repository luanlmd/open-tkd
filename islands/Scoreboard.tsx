import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

type Items = "hong" | "chung" | "round" | "fight";

type FightState = {
  fightNumber: number;
  roundNumber: number;
  chungPoints: number;
  hongPoints: number;
};

const storeFightLog = (fightLogs: FightState[]) => {
  localStorage.setItem("fightLogs", JSON.stringify(fightLogs));
};

const loadFightLog = (): FightState[] => {
  const storedLogs = localStorage.getItem("fightLogs");
  return storedLogs ? JSON.parse(storedLogs) : [];
};

const storeFightState = (fightState: FightState) => {
  localStorage.setItem("fightState", JSON.stringify(fightState));
};

const loadFightState = (): FightState | null => {
  const storedState = localStorage.getItem("fightState");
  return storedState ? JSON.parse(storedState) : null;
};

const downloadLogsAsCSV = (logs: FightState[]) => {
  const header = "Fight,Round,Hong,Chung\n";
  const rows = logs
    .map(
      (log) =>
        `${log.fightNumber},${log.roundNumber},${log.hongPoints},${log.chungPoints}`,
    )
    .join("\n");
  const csvContent = header + rows;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "fight_logs.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function Scoreboard() {
  const fightLogs = useSignal<FightState[]>([]);

  const fightNumber = useSignal(1);
  const roundNumber = useSignal(1);
  const hongPoints = useSignal(0);
  const chungPoints = useSignal(0);

  const showLogs = useSignal(false);

  useEffect(() => {
    const storedFightState = loadFightState();
    if (storedFightState) {
      fightNumber.value = storedFightState.fightNumber;
      roundNumber.value = storedFightState.roundNumber;
      hongPoints.value = storedFightState.hongPoints;
      chungPoints.value = storedFightState.chungPoints;
    }

    const storedFightLogs = loadFightLog();
    if (storedFightLogs) {
      fightLogs.value = storedFightLogs;
    }
  }, []);

  useEffect(() => {
    storeFightState({
      fightNumber: fightNumber.value,
      roundNumber: roundNumber.value,
      chungPoints: chungPoints.value,
      hongPoints: hongPoints.value,
    });
  }, [
    fightNumber.value,
    roundNumber.value,
    hongPoints.value,
    chungPoints.value,
  ]);

  const generateFightLog = (fightLog: FightState) => {
    storeFightLog([...fightLogs.value, fightLog]);
    fightLogs.value = [...fightLogs.value, fightLog];
  };

  const handleClick = (item: Items) => {
    item === "hong" && hongPoints.value++;
    item === "chung" && chungPoints.value++;

    if (item === "round") {
      if (confirm("Tem certeza que deseja iniciar o próximo round?")) {
        generateFightLog({
          fightNumber: fightNumber.value,
          roundNumber: roundNumber.value,
          chungPoints: chungPoints.value,
          hongPoints: hongPoints.value,
        });

        roundNumber.value++;
        hongPoints.value = 0;
        chungPoints.value = 0;
      }
    }

    if (item === "fight") {
      if (confirm("Tem certeza que deseja iniciar a próxima luta?")) {
        generateFightLog({
          fightNumber: fightNumber.value,
          roundNumber: roundNumber.value,
          chungPoints: chungPoints.value,
          hongPoints: hongPoints.value,
        });

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
    <>
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

          <div class="m-auto">
            <button
              type="button"
              class="border-2 rounded-2 px-2 bg-gray-800 hover:bg-gray-700"
              onClick={() => (showLogs.value = !showLogs.value)}
            >
              logs
            </button>
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

      {showLogs.value && (
        <div class="absolute top-0 left-0 m-4 p-4 bg-white bg-opacity-80 rounded max-h-96 overflow-y-auto">
          <h2 class="font-bold text-2xl mb-1">Logs</h2>
          {!!fightLogs.value.length && (
            <>
              <ul>
                {fightLogs.value.map((log) => (
                  <li>
                    Fight {log.fightNumber} - Round {log.roundNumber} -{" "}
                    <span class="bg-red-500 px-2 mx-1">{log.hongPoints}</span>
                    <span class="bg-blue-500 px-2 mx-1">{log.chungPoints}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => downloadLogsAsCSV(fightLogs.value)}
                class="border-2 rounded-2 px-2 bg-gray-800 hover:bg-gray-700 mt-2 text-white right-0"
              >
                Baixar CSV
              </button>
            </>
          )}
          {!fightLogs.value.length && <p>Nada para ver aqui ainda.</p>}
        </div>
      )}
    </>
  );
}
