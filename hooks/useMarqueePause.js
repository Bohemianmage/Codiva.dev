import { useRef, useEffect, useState, useCallback } from 'react';

const RESUME_AFTER_MS = 2800;

/**
 * Permite scroll horizontal manual sobre un carrusel con CSS marquee:
 * al interactuar, la animación se pausa; al soltar o dejar de hacer scroll,
 * se reanuda tras RESUME_AFTER_MS para no competir con el gesto del usuario.
 */
export default function useMarqueePause() {
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef(null);

  const clearTimer = useCallback(() => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    clearTimer();
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, [clearTimer]);

  const onPointerDown = useCallback(() => {
    clearTimer();
    setPaused(true);
  }, [clearTimer]);

  const onPointerUp = useCallback(() => {
    scheduleResume();
  }, [scheduleResume]);

  /** Cada movimiento de scroll reinicia el temporizador de reanudación. */
  const onScroll = useCallback(() => {
    setPaused(true);
    clearTimer();
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, [clearTimer]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const containerProps = {
    onPointerDownCapture: onPointerDown,
    onPointerUpCapture: onPointerUp,
    onPointerCancelCapture: onPointerUp,
    onScroll,
  };

  const innerClassName = (baseClass) =>
    [baseClass, paused ? 'marquee-paused' : ''].filter(Boolean).join(' ');

  return { containerProps, innerClassName };
}
