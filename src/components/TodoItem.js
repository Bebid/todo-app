import { useState } from "react";

import Modal from "./Modal";

function TodoItem(props) {
  const [bIsModalOpen, fChangeModalDisplay] = useState(false);

  function openModal() {
    fChangeModalDisplay(true);
  }

  function closeModal() {
    fChangeModalDisplay(false);
  }

  return (
    <li>
      <input type="checkbox" />
      {props.data}
      <button onClick={openModal}>Delete</button>
      {bIsModalOpen && (
        <Modal onCancel={closeModal} onConfirm={closeModal}></Modal>
      )}
    </li>
  );
}

export default TodoItem;
