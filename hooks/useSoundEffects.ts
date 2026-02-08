import useSound from 'use-sound';

// Fallback no-op sound function
const noop = () => {};

export const useSoundEffects = () => {
  let playClick = noop;
  let playSuccess = noop;
  let playConfetti = noop;
  let playHeartbeat = noop;
  let playWhoosh = noop;

  try {
    [playClick] = useSound('/sounds/click.mp3', { volume: 0.5 });
  } catch (e) {
    // Sound file not found or error loading - use noop
  }

  try {
    [playSuccess] = useSound('/sounds/success.mp3', { volume: 0.6 });
  } catch (e) {
    // Sound file not found or error loading - use noop
  }

  try {
    [playConfetti] = useSound('/sounds/confetti.mp3', { volume: 0.7 });
  } catch (e) {
    // Sound file not found or error loading - use noop
  }

  try {
    [playHeartbeat] = useSound('/sounds/heartbeat.mp3', { volume: 0.5 });
  } catch (e) {
    // Sound file not found or error loading - use noop
  }

  try {
    [playWhoosh] = useSound('/sounds/whoosh.mp3', { volume: 0.4 });
  } catch (e) {
    // Sound file not found or error loading - use noop
  }

  return {
    playClick,
    playSuccess,
    playConfetti,
    playHeartbeat,
    playWhoosh,
  };
};
