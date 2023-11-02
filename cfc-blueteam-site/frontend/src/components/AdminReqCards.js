import { AdminContext } from '../context/AdminContext';
import { useContext, useRef, useState, useEffect} from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminReqCards = () => {
  const { contactReqData, fetchContactRequests } = useContext(AdminContext);
  const { token } = useContext(AuthContext);
  const [fileData, setFileData] = useState(null);


  const handleFileRetrieval = async (e) => {
    let filename = e.target.getAttribute("data-file");
    filename = filename.substring(filename.indexOf('/static') + '/static/'.length, filename.length);
    // Make an HTTP GET request to your server API endpoint
    fetch('/api/contact-data/retrieve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('File not found');
        }
        return response.blob();
      })
      .then((data) => {
        // Downloads the file
        const link = document.createElement("a");
        link.download = filename;
        const blob = new Blob([data]);
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
        setFileData(data);
      })
      .catch((error) => {
        console.error('Error retrieving file:', error);
      });
  };

  const deleteRequest = (id) => {
    axios
      .delete(`/api/admin/contact-requests/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 'success') {
          fetchContactRequests(); // Fetch the updated data again
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!contactReqData || contactReqData.length === 0) {
    return (
      <div className='requests'>
        <div className='card'>
          <h1>No contact forms submitted or could not load.</h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`requests ${contactReqData.length > 6 ? 'scrollable' : ''}`}
    >
      {contactReqData.map((item) => (
        <div className='card' key={item._id}>
          <div className='card-content'>
            <div className='card-header'>
              <span>Contact Form Submission</span>
            </div>

            <div className='card-info'>
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {item.phoneNumber}
              </p>
              <p>
                <strong>Message:</strong> {item.message}
              </p>
              <p>
                <strong>File Link: </strong> {!item.file ? 'N/A' : <a href={item.file} target="_blank" rel="noreferrer">Open File</a>}
                | <a href={item.file} data-file={item.file} target="_blank" rel="noreferrer" onClick={handleFileRetrieval}>Download File</a>
              </p>
            </div>

            <div className='card-footer'>
              <button onClick={() => deleteRequest(item.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminReqCards;
