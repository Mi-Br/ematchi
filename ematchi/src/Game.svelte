<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import Countdown from "./Countdown.svelte";
    import Found from "./Found.svelte";
    import Grid from "./Grid.svelte";
    import type { Level } from "./levels";
    import { levels } from "./levels";
    import { shuffle } from "./utils";

    const dispatch = createEventDispatcher();
    let size: number;
    let grid: string[] = [];
    let found: string[] = [];
    let remaining: number = 0;
    let duration: number = 0;
    let playing: boolean = false;

    export function start(level: Level) {
        // reset the game state
        // level = level;
        size = level.size;
        grid = createGrid(level);
        remaining = duration = level.duration;
        resume();
    }

    function resume() {
        playing = true;
        console.log(playing);
        countdown();
        // communicate event to APP component
        dispatch("play");
    }

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
                //TODO: loose the game
                // playing = false;
                // return;
            }
            // console.log(remaining);
        }
        loop();
    }
    onMount(countdown);
</script>

<div class="game">
    <div class="info">
        {#if playing}
            <Countdown
                {remaining}
                {duration}
                on:click={() => {
                    countdown();
                    console.log("should play");
                }}
            />
        {/if}
    </div>
    <div class="grid-container">
        <Grid
            {grid}
            {found}
            on:found={(e) => {
                found = [...found, e.detail.emoji];
                // check if we found all emojis
                if (found.length == (size * size) / 2) {
                    // TODO - win the game
                    playing = false;
                }
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
