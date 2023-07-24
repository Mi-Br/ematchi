<script lang="ts">
    import { onMount } from "svelte";
    import Countdown from "./Countdown.svelte";
    import Found from "./Found.svelte";
    import Grid from "./Grid.svelte";
    import type { Level } from "./levels";
    import { levels } from "./levels";
    import { shuffle } from "./utils";

    const level = levels[0];

    let size: number;
    let grid: string[] = createGrid(level);
    let found: string[] = [];
    let remaining = level.duration;
    let duration = level.duration;
    let playing = false;

    function createGrid(level: Level) {
        const copy = [...level.emojis];
        const pairs: string[] = [];
        for (let i = 0; i < level.size ** 2 / 2; i++) {
            //Randomly pick emoji and remove it from array
            const index = Math.floor(Math.random() * copy.length);
            const emoji = copy[index];
            copy.splice(index, 1);
            pairs.push(emoji);
        }
        pairs.push(...pairs); //need to have 2 of each
        return shuffle(pairs);
    }
    function countdown() {
        const start = Date.now();
        let remaining_at_start = remaining;
        if (playing) return;
        function loop() {
            requestAnimationFrame(loop);
            remaining = remaining_at_start - (Date.now() - start);
            if (remaining <= 0) {
                //TODO: game lost
                playing = false;
                alert("Game over");
            }
            // console.log(remaining);
        }
        loop();
    }
    onMount(countdown);
</script>

<div class="game">
    <div class="info">
        <Countdown {remaining} duration={level.duration} />
    </div>
    <div class="grid-container">
        <Grid
            {grid}
            {found}
            on:found={(e) => {
                found = [...found, e.detail.emoji];
            }}
        />
    </div>
    <div class="info">
        <Found {found} />
    </div>
</div>

<style>
    .game {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: min(1vmin, 0.3em);
    }

    .info {
        width: 80em;
        height: 10em;
    }
    .grid-container {
        width: 80em;
        height: 80em;
    }
</style>
