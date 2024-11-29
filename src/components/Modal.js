/**
 * Modal Component
 * 
 * Reusable modal dialog component that can be shown/hidden
 * and contains custom content via children prop.
 */

function Modal(props) {
    const isOpen = props.isOpen;
    const onClose = props.onClose;
    const children = props.children;

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;