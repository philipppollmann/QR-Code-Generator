<script setup lang="ts">
const url = ref('')
const { qrDataUrl, isLoading, error, generateQrCode, downloadQrCode } = useQrCode()

function handleGenerate() {
  generateQrCode(url.value)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleGenerate()
  }
}
</script>

<template>
  <div class="min-h-screen relative flex items-center justify-center px-4 py-12">
    <!-- Animated background orbs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full animate-pulse-glow animate-float"
      />
      <div
        class="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-pink-600/20 rounded-full animate-pulse-glow animate-float-delayed"
      />
      <div
        class="absolute -bottom-24 left-1/3 w-80 h-80 bg-indigo-600/25 rounded-full animate-pulse-glow animate-float"
      />
    </div>

    <!-- Main content -->
    <div class="relative z-10 w-full max-w-lg">
      <!-- Header -->
      <div class="text-center mb-10 animate-fade-in-up">
        <h1 class="text-5xl font-extrabold text-white mb-3 tracking-tight">
          QR Code <span class="gradient-text">Generator</span>
        </h1>
        <p class="text-white/50 text-lg">Paste a link, get a QR code. Simple.</p>
      </div>

      <!-- Input Card -->
      <div class="glass rounded-3xl p-8 mb-6 animate-fade-in-up-delayed">
        <label for="url-input" class="block text-white/70 text-sm font-medium mb-3">
          Enter URL or text
        </label>
        <div class="flex gap-3">
          <input
            id="url-input"
            v-model="url"
            type="text"
            placeholder="https://example.com"
            class="flex-1 glass-input rounded-xl px-5 py-3.5 text-white placeholder-white/30 outline-none text-sm"
            @keydown="handleKeydown"
          />
          <button
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3.5 rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            :disabled="isLoading"
            @click="handleGenerate"
          >
            Generate
          </button>
        </div>
        <p v-if="error" class="text-red-400 text-sm mt-3">
          {{ error }}
        </p>
      </div>

      <!-- QR Code Display Card -->
      <div class="animate-fade-in-up-delayed">
        <QrCodeCard
          :qr-data-url="qrDataUrl"
          :is-loading="isLoading"
          @download="downloadQrCode()"
        />
      </div>

      <!-- Footer -->
      <p class="text-center text-white/20 text-xs mt-8">
        QR codes are generated client-side. No data is sent to any server.
      </p>
    </div>
  </div>
</template>
