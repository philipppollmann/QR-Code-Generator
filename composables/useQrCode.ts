import QRCode from 'qrcode'

export function useQrCode() {
  const qrDataUrl = ref('')
  const isLoading = ref(false)
  const error = ref('')

  async function generateQrCode(text: string) {
    if (!text.trim()) {
      error.value = 'Please enter a URL or text'
      return
    }

    isLoading.value = true
    error.value = ''

    try {
      qrDataUrl.value = await QRCode.toDataURL(text, {
        width: 512,
        margin: 2,
        color: {
          dark: '#1a1a2e',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      })
    } catch (e) {
      error.value = 'Failed to generate QR code'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  function downloadQrCode(filename = 'qrcode.png') {
    if (!qrDataUrl.value) return

    const link = document.createElement('a')
    link.href = qrDataUrl.value
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    qrDataUrl,
    isLoading,
    error,
    generateQrCode,
    downloadQrCode,
  }
}
