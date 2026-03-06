<script setup lang="ts">
defineProps<{
  qrDataUrl: string
  isLoading: boolean
}>()

defineEmits<{
  download: []
}>()
</script>

<template>
  <div class="glass rounded-3xl p-8 min-h-[360px] flex flex-col items-center justify-center">
    <!-- Placeholder state -->
    <div v-if="!qrDataUrl && !isLoading" class="text-center">
      <div class="w-48 h-48 mx-auto rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center mb-4">
        <svg class="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      </div>
      <p class="text-white/40 text-sm">Your QR code will appear here</p>
    </div>

    <!-- Loading state -->
    <div v-else-if="isLoading" class="text-center">
      <div class="w-48 h-48 mx-auto flex items-center justify-center">
        <div class="w-12 h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
      <p class="text-white/60 text-sm mt-4">Generating QR code...</p>
    </div>

    <!-- QR Code result -->
    <div v-else class="text-center animate-fade-in-up">
      <div class="bg-white rounded-2xl p-4 shadow-2xl shadow-purple-500/10 mb-6 inline-block">
        <img :src="qrDataUrl" alt="QR Code" class="w-48 h-48" />
      </div>
      <button
        class="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 transition-all duration-300"
        @click="$emit('download')"
      >
        <span class="flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PNG
        </span>
      </button>
    </div>
  </div>
</template>
