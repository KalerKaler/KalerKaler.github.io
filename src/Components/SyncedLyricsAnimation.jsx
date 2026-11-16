import { useEffect, useState, useRef } from 'react';
import styles from './SyncedLyricsAnimation.module.css';
import lyricsData from '../assets/pattern-recognition-lyrics.json';


export default function SyncedLyricsAnimation({ isOpen }) {
  const [currentTime, setCurrentTime] = useState(18);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  const firstLineBegin = lyricsData.lines.length > 0 ? lyricsData.lines[0].begin : 18.43;
  const totalDuration = lyricsData.lines.length > 0
    ? lyricsData.lines[lyricsData.lines.length - 1].end
    : 281.96;

  // Find current line and syllable based on currentTime
  const getCurrentLineAndSyllable = (time) => {
    // Before first line: show first line as upcoming (all future)
    if (time < firstLineBegin) {
      return { line: lyricsData.lines[0], currentSyllableIndex: -1, isPreStart: true };
    }
    for (let i = 0; i < lyricsData.lines.length; i++) {
      const line = lyricsData.lines[i];
      if (time >= line.begin && time <= line.end) {
        let currentSyllableIndex = -1;
        for (let j = 0; j < line.syllables.length; j++) {
          const syl = line.syllables[j];
          if (time >= syl.begin && time <= syl.end) {
            currentSyllableIndex = j;
            break;
          }
        }
        return { line, currentSyllableIndex };
      }
      // Check if we're in a gap between this line and the next
      const nextLine = lyricsData.lines[i + 1];
      if (nextLine && time > line.end && time < nextLine.begin) {
        // In gap: show next line as upcoming (all future)
        return { line: nextLine, currentSyllableIndex: -1, isGap: true };
      }
    }
    // After last line: in final gap before loop - show nothing (empty)
    return { line: null, currentSyllableIndex: -1, isPostEnd: true };
  };

  // Start animation when modal opens
  useEffect(() => {
    if (isOpen && !isPlaying) {
      setIsPlaying(true);
      startTimeRef.current = performance.now() / 1000 - firstLineBegin;

      const animate = (timestamp) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp / 1000;
        }
        const elapsed = timestamp / 1000 - startTimeRef.current;
        const time = elapsed % totalDuration;
        setCurrentTime(time);
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    } else if (!isOpen && isPlaying) {
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      startTimeRef.current = null;
      setCurrentTime(0);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen, totalDuration]);

  // Reset when time loops
  useEffect(() => {
    if (currentTime >= totalDuration - 0.1) {
      startTimeRef.current = performance.now() / 1000;
    }
  }, [currentTime, totalDuration]);

  const { line, currentSyllableIndex, isPreStart, isGap, isPostEnd } = getCurrentLineAndSyllable(currentTime);

  // During gaps (between lines or after last line), show nothing
  if (!line) {
    return <div className={styles.container} aria-hidden="true" />;
  }

  return (
    <div className={styles.container} aria-label="Synced lyrics animation">
      <div className={styles.lineText}>
        {line.syllables.map((syl, sylIdx) => {
          const isCurrent = sylIdx === currentSyllableIndex;
          const isPast = sylIdx < currentSyllableIndex;
          const isFuture = sylIdx > currentSyllableIndex;

          let className = styles.syllable;
          if (isCurrent) className += ` ${styles.current}`;
          else if (isPast) className += ` ${styles.past}`;
          else className += ` ${styles.future}`;

          return (
            <span key={sylIdx} className={className}>
              {syl.text}{syl.space ? ' ' : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
}