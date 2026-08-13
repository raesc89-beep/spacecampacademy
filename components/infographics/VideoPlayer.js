'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw } from 'lucide-react';

/**
 * VideoPlayer — Reproductor de video temático para infografías interactivas de Space Camp Academy.
 * 
 * Props:
 *   src      — (string) Ruta al archivo de video (ej. '/assets/asteroides/Video Rosseta.mp4')
 *   title    — (string) Título descriptivo del video
 *   color    — (string) Color temático del nodo (hex, ej. '#FF6B6B')
 *   poster   — (string, opcional) Imagen de preview/poster
 */
export default function VideoPlayer({ src, title, color = '#4D96FF', poster }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const hideTimeout = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => { setIsPlaying(false); setHasStarted(false); };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;
    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (e) { /* fallback: do nothing */ }
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const bar = e.currentTarget;
    if (!video || !bar) return;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = clickX / rect.width;
    video.currentTime = fraction * video.duration;
  };

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
    setHasStarted(true);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    if (isPlaying) {
      hideTimeout.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      style={{
        position: 'relative',
        borderRadius: isFullscreen ? 0 : '16px',
        overflow: 'hidden',
        background: '#000',
        border: isFullscreen ? 'none' : `1px solid ${color}30`,
        boxShadow: isFullscreen ? 'none' : `0 4px 24px ${color}15, 0 0 0 1px rgba(255,255,255,0.05)`,
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
      }}
    >
      {/* Video element */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        onClick={togglePlay}
        style={{
          width: '100%',
          display: 'block',
          cursor: 'pointer',
          maxHeight: isFullscreen ? '100vh' : '400px',
          objectFit: 'contain',
          background: '#000',
        }}
      />

      {/* Big play overlay (before first play) */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={togglePlay}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)`,
              cursor: 'pointer',
              gap: '1rem',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  `0 0 20px ${color}40`,
                  `0 0 40px ${color}60`,
                  `0 0 20px ${color}40`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid rgba(255,255,255,0.3)',
              }}
            >
              <Play size={32} fill="#fff" color="#fff" style={{ marginLeft: '4px' }} />
            </motion.div>
            {title && (
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 600,
                textAlign: 'center',
                maxWidth: '280px',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                letterSpacing: '0.3px',
              }}>
                🎬 {title}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls bar */}
      <AnimatePresence>
        {(showControls || !isPlaying) && hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
              padding: '2rem 1rem 0.8rem',
            }}
          >
            {/* Progress bar */}
            <div
              onClick={handleProgressClick}
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '3px',
                cursor: 'pointer',
                marginBottom: '0.6rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Buffered indicator */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${color}, ${color}CC)`,
                borderRadius: '3px',
                transition: 'width 0.1s linear',
                boxShadow: `0 0 8px ${color}60`,
              }} />
              {/* Scrubber dot */}
              <div style={{
                position: 'absolute',
                left: `${progress}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: color,
                border: '2px solid #fff',
                boxShadow: `0 0 6px ${color}80`,
                transition: 'left 0.1s linear',
              }} />
            </div>

            {/* Controls row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ControlButton onClick={togglePlay} color={color}>
                  {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
                </ControlButton>
                <ControlButton onClick={restart} color={color}>
                  <RotateCcw size={14} />
                </ControlButton>
                <ControlButton onClick={toggleMute} color={color}>
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </ControlButton>
                <span style={{
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.5px',
                  marginLeft: '0.3rem',
                }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {title && (
                  <span style={{
                    fontSize: '0.7rem',
                    color: `${color}AA`,
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    maxWidth: '180px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {title}
                  </span>
                )}
                <ControlButton onClick={toggleFullscreen} color={color}>
                  {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                </ControlButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top gradient decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: 0.6,
      }} />
    </div>
  );
}

function ControlButton({ onClick, color, children }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.15, backgroundColor: `${color}30` }}
      whileTap={{ scale: 0.9 }}
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        border: `1px solid rgba(255,255,255,0.1)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#fff',
        transition: 'all 0.2s',
      }}
    >
      {children}
    </motion.button>
  );
}
