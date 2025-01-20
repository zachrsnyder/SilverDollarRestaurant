// util component that contains base universal modal capability including escape keys and focus trapping
import { useEffect, useRef, useCallback } from 'react';

interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;

  onFocusMiss?: () => void
}

export function useModal({ isOpen, onClose, onFocusMiss = () => {onClose()} }: UseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const initialFocusPerformed = useRef(false);

  //handles leaving modal when click isnt within modal. Triggers on every mouse event
  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onFocusMiss();
      }
    },
    [onFocusMiss]
  );

  //handles escape upon use of escape key, triggers on every key down.
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Focus trap
  const handleFocusTrap = useCallback((event: KeyboardEvent) => {
    if (!modalRef.current || event.key !== 'Tab') return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      //add event listeners
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleFocusTrap);

      //prevent body scroll
      

      //cleanup
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keydown', handleFocusTrap);
        
        // // Restore focus and scroll
        // previousActiveElement.current?.focus();
        // document.body.style.overflow = 'unset';
        // initialFocusPerformed.current = false;
      };
    }
  }, [isOpen, handleClickOutside, handleKeyDown, handleFocusTrap]);

  return { modalRef };
}
