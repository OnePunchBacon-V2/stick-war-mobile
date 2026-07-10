import React from 'react';
import styles from './ControlOverlay.module.css';

interface ControlOverlayProps {
  onMove?: (direction: number) => void;
  onAttack?: () => void;
  onSpecial?: () => void;
  onPause?: () => void;
}

const ControlOverlay: React.FC<ControlOverlayProps> = ({
  onMove,
  onAttack,
  onSpecial,
  onPause,
}) => {
  return (
    <div className={styles.controlOverlay}>
      {/* D-Pad */}
      <div className={styles.dpad}>
        <button className={styles.up} onClick={() => onMove?.(-1)} />
        <button className={styles.left} onClick={() => onMove?.(-1)} />
        <button className={styles.right} onClick={() => onMove?.(1)} />
        <button className={styles.down} onClick={() => onMove?.(1)} />
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.attack} onClick={onAttack}>
          A
        </button>
        <button className={styles.special} onClick={onSpecial}>
          B
        </button>
        <button className={styles.pause} onClick={onPause}>
          ⏸
        </button>
      </div>
    </div>
  );
};

export default ControlOverlay;
