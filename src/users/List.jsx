import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap'; // Import React Bootstrap Modal

import { userActions } from '_store';

export { List };

function List() {
    const users = useSelector(x => x.users.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    const [showDetails, setShowDetails] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleClose = () => setShowDetails(false);
    const handleShow = (user) => {
        setSelectedUser(user);
        setShowDetails(true);
    };

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '4%' }}> # </th>
                        <th style={{ width: '14%' }}>Name</th>
                        <th style={{ width: '24%' }}>Email Address</th>
                        <th style={{ width: '14%' }}>Phone No</th>
                        <th style={{ width: '14%' }}>Gender</th>
                        <th style={{ width: '14%' }}>Birthday</th>
                        <th style={{ width: '14%' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.value?.map((user, index) =>
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.Email}</td>
                            <td>{user.phone}</td>
                            <td>{user.gender}</td>
                            <td>{user.selectedDate}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <button onClick={() => handleShow(user)} className="btn btn-sm">
                                    <FontAwesomeIcon icon={faExternalLinkAlt} style={{ color: 'green' }} /> {/* Info icon */}
                                </button>

                                <Link to={`edit/${user.id}`} className="btn btn-sm me-1">
                                    <FontAwesomeIcon icon={faEdit} style={{ color: 'blue' }} /> {/* Edit icon */}
                                </Link>
                                <button onClick={() => dispatch(userActions.delete(user.id))} className="btn btn-sm" style={{ width: '25px' }} disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : (
                                            <span>
                                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} /> {/* Delete icon */}
                                            </span>
                                        )
                                    }
                                </button>
                               
                            </td>
                        </tr>
                    )}
                    {users?.loading &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

            {/* Details Modal */}
            <Modal show={showDetails} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <div>
                            <p>Name: {selectedUser.firstName} {selectedUser.lastName}</p>
                            <p>Email: {selectedUser.Email}</p>
                            <p>Phone: {selectedUser.phone}</p>
                            <p>Gender: {selectedUser.gender}</p>
                            <p>Birthday: {selectedUser.selectedDate}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>Ok</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
