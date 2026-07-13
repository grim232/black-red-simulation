import { useCallback } from 'react'

function ConfirmModal({ onConfirm, onCancel }) {
  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        onCancel()
      }
    },
    [onCancel]
  )

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card">
        <h3>ยืนยันการล้างสถิติ</h3>
        <p>คุณต้องการล้างสถิติทั้งหมดใช่หรือไม่?</p>
        <div className="modal-actions">
          <button
            id="modal-cancel"
            className="btn-modal-cancel"
            onClick={onCancel}
          >
            ยกเลิก
          </button>
          <button
            id="modal-confirm"
            className="btn-modal-confirm"
            onClick={onConfirm}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
