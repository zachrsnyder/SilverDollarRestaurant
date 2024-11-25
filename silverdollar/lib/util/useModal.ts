// util component that contains base universal modal capability including escape keys and focus trapping
import { useEffect, useRef, useCallback } from 'react';

interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function useModal({ isOpen, onClose }: UseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  //handles leaving modal when click isnt within modal. Triggers on every mouse event
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
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
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleFocusTrap);

      //focus first focusable element in modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements?.length) {
        (focusableElements[0] as HTMLElement).focus();
      }

      //prevent body scroll
      document.body.style.overflow = 'hidden';

      //cleanup
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keydown', handleFocusTrap);
        
        // Restore focus and scroll
        previousActiveElement.current?.focus();
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, handleClickOutside, handleKeyDown, handleFocusTrap]);

  return { modalRef };
}
