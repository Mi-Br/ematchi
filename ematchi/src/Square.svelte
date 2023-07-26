<script lang="ts">
    import { get_tweemoji_url } from "./utils";
    import { send } from "./transition";

    export let emoji: string;
    export let selected: boolean;
    export let found: boolean;
    export let group: "a" | "b";
</script>

<div class="square" class:flipped={selected || found}>
    <!-- {#if !selected}
       
    {/if} -->
    <button on:click disabled={selected || found} />
    {#if !found}
        <img
            out:send={{ key: `${emoji}:${group}` }}
            alt={emoji}
            src={get_tweemoji_url(emoji)}
        />
    {/if}
</div>

<style>
    .square {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        transform: rotateY(180deg);
        transition: transform 0.4s;
        transform-style: preserve-3d;
    }
    .square * {
    }

    .flipped {
        transform: rotateY(0);
    }

    img {
        width: 6em;
        height: 6em;
        pointer-events: none;
        backface-visibility: hidden;
    }

    button {
        position: absolute;
        width: 100%;
        height: 100%;
        /* background: #eee; */
        border: 0;
        border-radius: 1em;
    }
</style>
