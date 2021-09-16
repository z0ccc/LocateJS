/* eslint-disable no-unused-vars */
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { ReactComponent as XCircle } from '../xCircle.svg';
import { ReactComponent as CheckCircle } from '../checkCircle.svg';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const TableRow = ({ item }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    if (item.issues.filter(Boolean).length !== 0) setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <tr>
      <td>{item.key}</td>
      <td>{item.value}</td>
      <td>
        {item.issues.filter(Boolean).length !== 0 ? (
          <XCircle className="circleButton issueButton" onClick={openModal} />
        ) : (
          <CheckCircle className="circleButton" />
        )}
      </td>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button type="submit" onClick={closeModal}>
          close
        </button>
        <>
          {item.issues.map((ele, index) => (
            <div className="newline" key={index}>
              {ele}
            </div>
          ))}
        </>
      </Modal>
    </tr>
  );
};

export default TableRow;
