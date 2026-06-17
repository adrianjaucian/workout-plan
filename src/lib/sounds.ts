let audioContext: AudioContext | null = null

export function resumeAudio(): void {
  try {
    if (!audioContext) {
      audioContext = new AudioContext()
    }
    if (audioContext.state === 'suspended') {
      void audioContext.resume()
    }
  } catch {
    // Audio not available
  }
}

function playNote(
  frequency: number,
  startTime: number,
  duration: number,
  volume = 0.12,
  type: OscillatorType = 'sine',
) {
  if (!audioContext) return

  const oscillator = audioContext.createOscillator()
  const gain = audioContext.createGain()

  oscillator.type = type
  oscillator.frequency.value = frequency
  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

  oscillator.connect(gain)
  gain.connect(audioContext.destination)
  oscillator.start(startTime)
  oscillator.stop(startTime + duration + 0.05)
}

function vibrate(pattern: number | number[]): void {
  try {
    navigator.vibrate?.(pattern)
  } catch {
    // Vibration not available
  }
}

/** Soft pentatonic chime — fairy-fountain / wind-bell feel */
export function playTimerComplete(): void {
  resumeAudio()
  if (!audioContext) return

  const t = audioContext.currentTime
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((freq, i) => playNote(freq, t + i * 0.11, 0.55, 0.22))

  vibrate([120, 60, 120])
}

/** Ascending fanfare — quest-complete feel */
export function playWorkoutComplete(): void {
  resumeAudio()
  if (!audioContext) return

  const t = audioContext.currentTime
  const melody = [392.0, 493.88, 587.33, 659.25, 783.99, 987.77]
  melody.forEach((freq, i) => playNote(freq, t + i * 0.09, 0.65, 0.28))
  playNote(196.0, t + 0.45, 1.4, 0.16)
  playNote(293.66, t + 0.7, 1.0, 0.12, 'triangle')

  vibrate([180, 90, 180, 90, 280])
}
