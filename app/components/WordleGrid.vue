<template>
  <div class="grid grid-cols-5 gap-2">
    <template v-for="row in rows" :key="row">
      <template v-for="col in cols" :key="`${row}-${col}`">
        <WordleCell :letter="tileLetter(row-1, col-1)" :state="tileState(row-1, col-1)" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import type { TileState } from '#shared/types'
  import WordleCell from './WordleCell.vue'

  const props = defineProps<{ rows: number; cols: number; guesses: string[]; current: string; evaluations: TileState[][] }>()

  function tileLetter (rowIdx: number, colIdx: number): string {
    if (rowIdx < props.guesses.length) return props.guesses[rowIdx]![colIdx] ?? ''
    if (rowIdx === props.guesses.length) return props.current[colIdx] ?? ''
    return ''
  }

  function tileState (rowIdx: number, colIdx: number): TileState {
    if (rowIdx < props.evaluations.length) return props.evaluations[rowIdx]![colIdx] ?? 'unknown'
    return 'unknown'
  }
</script>