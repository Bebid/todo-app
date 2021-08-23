function Modal(props) {
  return (
    <div>
      <button onClick={props.onCancel}>Cancel</button>
      <button onClick={props.onConfirm}>Confirm</button>
    </div>
  );
}

export default Modal;
