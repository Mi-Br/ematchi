<script lang="ts">
    import { onMount } from "svelte";
  import Game from "./Game.svelte";
  import Modal from "./Modal.svelte";
  import { levels } from "./levels";
  import {confetti} from "@neoconfetti/svelte";
  let state: "waiting" | "playing" | "won" | "paused" | "lost" = "waiting";
  let game: Game;


</script>

<Game
  bind:this={game}
  on:play={() => {
    state = "playing";
  }}
  on:paused={() => {
    state = "paused";
  }}
  on:won={() => {
    state = "won";
  }}
  on:lost={() => {
    state = "lost";
  }}
/>

{#if state != "playing"}
  <Modal>
    <header>
      <h1>e<span>match</span>i</h1>
      <p>the emoji matching game</p>
    </header>
    {#if state == "won" || state == "lost"}
      <p>you {state}! play again?</p>
    {:else if state == "paused"}
      <p>game paused</p>
    {:else if state == "waiting"}
      <p>Choose a level:</p>
    {/if}
    <div class="buttons">
      {#if state == "paused"}
        <button on:click={()=>{
          game.resume();
        }}
        >resume</button>
        <button on:click={()=>{
          state = "waiting";
        }}>quit</button>
      {:else}
        {#each levels as level}
          <button
            on:click={() => {
              game.start(level);
              state = "playing";
            }}>{level.label}</button
          >
        {/each}
      {/if}
    </div>
  </Modal>
{/if}

{#if state=='won'}
  <div class="confetti" use:confetti={{
    stageHeight:innerHeight,
    stageWidth:innerWidth,
    duration: 5000,
  }}
  ></div>
{/if}

<style>
  h1 {
    font-size: 4em;
  }
  span {
    color: purple;
  }
  p {
    font-family: Grandstander;
  }
  .confetti {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
