import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'warning' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  variant = 'danger'
}) => {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          iconColor: 'text-red-500',
          confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
          bgColor: 'bg-red-50 dark:bg-red-950/20'
        };
      case 'warning':
        return {
          iconColor: 'text-yellow-500',
          confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-white',
          bgColor: 'bg-yellow-50 dark:bg-yellow-950/20'
        };
      default:
        return {
          iconColor: 'text-blue-500',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
          bgColor: 'bg-blue-50 dark:bg-blue-950/20'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-card rounded-xl p-6 w-full max-w-md shadow-xl border"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${styles.bgColor}`}>
                <AlertTriangle className={`h-6 w-6 ${styles.iconColor}`} />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-full transition-colors"
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Message */}
          <div className="mb-6">
            <p className="text-muted-foreground leading-relaxed">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={styles.confirmButton}
            >
              {isLoading ? 'Processing...' : confirmText}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDialog; 