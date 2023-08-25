const statusDiv = document.getElementById('status');
export const contactDiv = document.getElementById('contactDetails');
const editBtn = document.getElementById('edit');
const closeBtn = document.getElementById('close');
import { fetchDataAndDisplay } from './request.js'

fetchDataAndDisplay()

editBtn.addEventListener('click', () => {
  editBtn.classList.add('hide')
  closeBtn.classList.remove('hide')
  closeBtn.classList.add('show')
  // transfrom text into inputs 
  const paragraphs = document.querySelectorAll('#contactDetails > p > span')
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'form-input'
    input.value = paragraph.textContent.replace(':', '');
    paragraph.parentNode.replaceChild(input, paragraph);

  }
  const submitButton = document.createElement('button');

  submitButton.textContent = 'Submit';
  submitButton.classList.add('btn', 'btn-submit', 'show');
  document.querySelector('.btn-wrapper').appendChild(submitButton)




  if (document.querySelectorAll('#form-input') <= 7) {
    document.querySelectorAll('#form-input')[0].classList.add('first-name')
    document.querySelectorAll('#form-input')[1].classList.add('last-name')
    document.querySelectorAll('#form-input')[2].classList.add('email')
    document.querySelectorAll('#form-input')[3].classList.add('mobile')
    document.querySelectorAll('#form-input')[4].classList.add('landline')
    document.querySelectorAll('#form-input')[5].classList.add('id')
    document.querySelectorAll('#form-input')[6].classList.add('status-vip')
  } else {
    document.querySelectorAll('#form-input')[0].classList.add('company-name')
    document.querySelectorAll('#form-input')[1].classList.add('adress-line-1')
    document.querySelectorAll('#form-input')[2].classList.add('adress-line-2')
    document.querySelectorAll('#form-input')[3].classList.add('city')
    document.querySelectorAll('#form-input')[4].classList.add('postcode')
    document.querySelectorAll('#form-input')[5].classList.add('local')
    document.querySelectorAll('#form-input')[6].classList.add('contry')
    document.querySelectorAll('#form-input')[7].classList.add('company-reg')
    document.querySelectorAll('#form-input')[8].classList.add('client-industry')
    document.querySelectorAll('#form-input')[9].classList.add('client-size')
    document.querySelectorAll('#form-input')[10].classList.add('website')
    document.querySelectorAll('#form-input')[11].classList.add('company-id')
    document.querySelectorAll('#form-input')[12].classList.add('status-vip')
    document.querySelectorAll('#form-input')[13].classList.add('comms-contact')
    document.querySelectorAll('#form-input')[14].classList.add('tech-contact')
  }

  console.log(document.querySelectorAll('#form-input').length)

  closeBtn.addEventListener('click', () => {
    const inputParagraphs = contactDiv.querySelectorAll('p');
    inputParagraphs.forEach(paragraph => {
      const input = paragraph.querySelector('input');
      if (input) {
        const textValue = input.value;
        const newSpan = document.createElement('span');
        newSpan.textContent = textValue;
        paragraph.removeChild(input);
        paragraph.appendChild(newSpan);
      }
    });
    fetchDataAndDisplay()
  })
  closeBtn.addEventListener('click', () => {
    closeBtn.classList.remove('show')
    if (document.querySelector('.btn-submit')) {
      document.querySelector('.btn-submit').remove()
    }

    editBtn.classList.remove('hide')
  });


  const apiUrlUpdate = 'https://prod-14.westeurope.logic.azure.com/workflows/aeed5485e6ee44059332d53c2236c2ed/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oygT0bsNCIf-x6ceQb4GZbh8akQ9RkXHb7lDw8Gco2I';

  //    sending request to Core4 for updating the info
  document.querySelector('.btn-submit').addEventListener('click', () => {

    if (document.querySelector('.status-vip').value === 'Not VIP') {
      const data = {
        "updateType": "Not VIP",
        "contacts": [
          {
            "email": document.querySelector('.email').value,
            "firstName": document.querySelector('.first-name').value,
            "id": parseInt(document.querySelector('.id').value),
            "landline": document.querySelector('.landline').value,
            "lastName": document.querySelector('.last-name').value,
            "mobile": document.querySelector('.mobile').value,

          }
        ]
      };

      fetch(apiUrlUpdate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            console.log('ok');
            return response.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then(responseData => {
          console.log('Response:', responseData);
          // Process the response data here
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle any errors here
        });
    } else {
      const data = {
        "updateType": "VIP",
        "UserId": 7216,
        "CompanyDetails": {
          "clientName": document.querySelector('.company-name').value,
          "addressLine1": document.querySelector('.adress-line-1').value,
          "addressLine2": document.querySelector('.adress-line-2').value,
          "city": document.querySelector('.city').value,
          "postcode": document.querySelector('.postcode').value,
          "county": document.querySelector('.local').value,
          "country": document.querySelector('.local').value,
          "phone": '02070330466',
          "companyRegNo": document.querySelector('.company-reg').value,
          "clientIndustry": document.querySelector('.client-industry').value,
          "clientSize": document.querySelector('.client-size').value,
          "website": document.querySelector('.website').value,
          "id": 631,
          "commsContacts": [
            {
              "@odata.type": "#Microsoft.Azure.Connectors.SharePoint.SPListExpandedReference",
              "Id": 7216,
              "Value": "Tracy Roycroft (VIP)"
            }
          ],
          "techContacts": [
            {
              "@odata.type": "#Microsoft.Azure.Connectors.SharePoint.SPListExpandedReference",
              "Id": 7216,
              "Value": "Tracy Roycroft (VIP)"
            }
          ]
        },
        "ContactDetails": [
          {
            "firstName": "Clive",
            "lastName": "Killick",
            "email": "clive@surealarms.co.uk",
            "landline": "02070330466",
            "mobile": "",
            "id": 7232,
            "vIPStatus": "No",
            "status": "Active"
          },
          {
            "firstName": "Gary",
            "lastName": "Crawford",
            "email": "gary.crawford@surealarms.co.uk",
            "landline": "07970525266 ",
            "mobile": "02070330466",
            "id": 7234,
            "vIPStatus": "No",
            "status": "Active"
          },
          {
            "firstName": "James",
            "lastName": "Garre",
            "email": "james@surealarms.co.uk",
            "landline": "02070330466",
            "mobile": "",
            "id": 7230,
            "vIPStatus": "No",
            "status": "Active"
          },
          {
            "firstName": "Juan",
            "lastName": "Granada",
            "email": "juan@surealarms.co.uk",
            "landline": "02070330466",
            "mobile": "",
            "id": 7231,
            "vIPStatus": "No",
            "status": "Active"
          },
          {
            "firstName": "Karen",
            "lastName": "Murphy",
            "email": "karen@sureintegrated.co.uk",
            "landline": "",
            "mobile": "",
            "id": 16700,
            "vIPStatus": "No",
            "status": "Active"
          },
          {
            "firstName": "Sean",
            "lastName": "Griffiths",
            "email": "sean@sureintegrated.co.uk",
            "landline": "",
            "mobile": "",
            "id": 16982,
            "vIPStatus": "No",
            "status": "Active"
          },
          {
            "firstName": "Sure",
            "lastName": "Alarms",
            "email": "office@sureintegrated.co.uk",
            "landline": "",
            "mobile": "",
            "id": 12678,
            "vIPStatus": "No",
            "status": "Active"
          },
          {
            "firstName": "Tracy",
            "lastName": "Roycroft",
            "email": "tracyroycroft@hotmail.com",
            "landline": "",
            "mobile": "",
            "id": 16242,
            "vIPStatus": "No",
            "status": "Active"
          },
          {
            "firstName": "Tracy",
            "lastName": "Roycroft",
            "email": "tracy@sureintegrated.co.uk",
            "landline": "02070330466",
            "mobile": "",
            "id": 7216,
            "vIPStatus": "Yes",
            "status": "Active"
          },
          {
            "firstName": "Yuriy",
            "lastName": "Valyukh",
            "email": "yuriy@surealarms.co.uk",
            "landline": "02070330466",
            "mobile": "",
            "id": 7233,
            "vIPStatus": "No",
            "status": "Active"
          }
        ]
      }
      fetch(apiUrlUpdate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            console.log('ok with VIP');
            return response.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then(responseData => {
          console.log('Response:', responseData);
          // Process the response data here
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle any errors here
        });
    }
    console.log(document.querySelector('.status-vip').value)



  })

})



// Modal
function bindModal(trigger, modal, close) {
  trigger = document.querySelector(trigger),
    modal = document.querySelector(modal),
    close = document.querySelector(close)

  const body = document.body

  trigger.addEventListener('click', e => {
    e.preventDefault()
    modal.style.display = 'flex'
    body.classList.add('locked')
  });
  close.addEventListener('click', () => {
    modal.style.display = 'none'
    body.classList.remove('locked')
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none'
      body.classList.remove('locked')
    }
  })
}

bindModal('.modal__btn', '.modal__wrapper', '.modal__close')

document.getElementById('submit-contracts').addEventListener('click', () => {
  const apiUrlUpdate = 'https://prod-14.westeurope.logic.azure.com/workflows/aeed5485e6ee44059332d53c2236c2ed/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oygT0bsNCIf-x6ceQb4GZbh8akQ9RkXHb7lDw8Gco2I';

  const data = {
    "updateType": "Not VIP",
    "contacts": [
      {
        "email": document.querySelector('.email').value,
        "firstName": document.querySelector('.first-name').value,
        // "id": parseInt(document.querySelector('.id').value),
        "landline": document.querySelector('.landline').value,
        "lastName": document.querySelector('.last-name').value,
        "mobile": document.querySelector('.mobile').value,

      }
    ]
  };

  fetch(apiUrlUpdate, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    })
    .then(responseText => {
      console.log("Request successful!");
      console.log("Response content:");
      console.log(responseText);
    })
    .catch(error => {
      console.error("Request failed:", error);
    });

})


