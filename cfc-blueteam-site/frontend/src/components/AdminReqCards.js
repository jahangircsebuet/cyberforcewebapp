import { AdminContext } from '../context/AdminContext';
import { useContext, useRef, useState, useEffect} from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminReqCards = () => {
  const { contactReqData, fetchContactRequests } = useContext(AdminContext);
  const { token } = useContext(AuthContext);


  // file download 
  const [file, setFile] = useState();
  const fileLink = useRef();
  useEffect(() => {
    if (file) {
      fileLink.current.click();
    }
  }, [file]);

  // const download = async (e) => {
  //   alert("download called");
  //   const url = window.URL.createObjectURL(new Blob([e.target.innerText]));
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute('download', e.target.innerText);
  //   document.body.appendChild(link);
  //   link.click();
  // };

  const fetchFile = async (e) => {
    const response = await fetch(e.target.innerText);
    const data = await response.json();
    setFile(data);
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
                <strong>File Link: </strong> {!item.file ? 'N/A' : <a href={item.file} target="_blank" rel="noreferrer" onClick={fetchFile}>Open</a>}
                | {<a download href={item.file} target="_blank" ref={fileLink} onClick={fetchFile}>Download</a>}
                
                {/* <strong>File Link: </strong> {!item.file ? 'N/A' : item.file} */}
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
