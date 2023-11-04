import axios from 'axios';
import { showAlert } from '../components/Alerts';

function ContactUsRequest(contactData, file) {
  // const { fullname, email, phonenumber, message } = contactData;
console.log("file");
console.log(file);
  axios
    .post('/api/contact-data/', {
      fullname: contactData.fullname,
      email: contactData.email, 
      phonenumber: contactData.phonenumber,
      message: contactData.message,
      file: file.name
    })
    .then((res) => {
      if (res.data.status === 'success') {
        sendFile(file, res.data.newContact);
      }
    })
    .catch((err) => {
      console.log(err);
      showAlert('error', `There was an error submiting your request.`);
    });
}

function sendFile(fileData, newContact) {
  const formData = new FormData();
  formData.append('file', fileData);
  formData.append('newContact', JSON.stringify(newContact));

  console.log("fileData");
  console.log(fileData);

  axios
  // .post('/api/contact-data/file', formData, {  
  .post('/uploadFile', formData, { 
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.data.status === 'success') {
        showAlert('success', `${res.data.message}`);
        // showAlert('success', '');
      }
    })
    .catch((err) => {
      console.log(err);
      showAlert('error', `There was an error submiting your file.`);
    });
}

export default ContactUsRequest;
