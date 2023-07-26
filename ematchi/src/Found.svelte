<script lang="ts">
    import { get_tweemoji_url } from "./utils";
    import { receive } from "./transition";

    export let found: string[] = [];
</script>

<div class="found">
    {#each found as emoji (emoji)}
        <div class="pair">
            <img
                in:receive={{ key: `${emoji}:a` }}
                alt={emoji}
                src={get_tweemoji_url(emoji)}
            />
            <img
                in:receive={{ key: `${emoji}:b` }}
                alt={emoji}
                src={get_tweemoji_url(emoji)}
            />
        </div>
    {/each}
</div>

<style>
    .found {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
        height: 100%;
    }
    .pair {
        width: 4em;
        height: 4em;
        position: relative;
    }
    img {
        position: absolute;
        left: 0;
        top: 0;
        width: 4em;
        height: 4em;
    }
</style>
