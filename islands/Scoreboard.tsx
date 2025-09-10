import { useSignal } from "@preact/signals";

type Items = "hong" | "chung" | "round";

export default function Scoreboard() {
    const hongPoints = useSignal(0);
    const chungPoints = useSignal(0);
    const roundNumber = useSignal(1);

    const handleClick = (item: Items) => {
        item === "hong" && hongPoints.value++;
        item === "chung" && chungPoints.value++;
        item === "round" && roundNumber.value++;
    }

    const handleRightClick = (item: Items, e: MouseEvent) => {
        e.preventDefault();
        item === "hong" && hongPoints.value > 0 && hongPoints.value--;
        item === "chung" && chungPoints.value > 0 && chungPoints.value--;
        item === "round" && roundNumber.value > 1 && roundNumber.value--;
    }

    return (

        <div class="w-screen h-screen flex text-[300px] select-none">
            <div id="hong" role="button" tabIndex={0} class="flex-1 h-full bg-red-600 hover:bg-red-500 flex items-center justify-center text-white" onClick={() => handleClick('hong')} onContextMenu={(e) => handleRightClick('hong', e)}>
                { hongPoints }
            </div>
            <div class="w-1/5 bg-black text-[50px] flex flex-col h-screen">
                <div class="text-amber-50 w-full items-center text-center mt-auto py-10" onClick={() => handleClick('round')} onContextMenu={(e) => handleRightClick('round', e)}>
                    <div>Round</div>
                    <div class="text-amber-50 text-[100px]">{roundNumber}</div>
                </div>
            </div>
            <div class="flex-1 h-full tabIndex={0} bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white" onClick={() => handleClick('chung')} onContextMenu={(e) => handleRightClick('chung', e)}>
                { chungPoints }
            </div>
        </div>
    );
}
