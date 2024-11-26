import { useModal } from "@/lib/util/useModal";

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
  }
  
  export function BaseModal({ 
    isOpen, 
    onClose, 
    children,
    className = ''
  }: BaseModalProps) {
    const { modalRef } = useModal({ isOpen, onClose });
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        />
  
        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            ref={modalRef}
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${className}`}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }