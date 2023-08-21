const statusDiv = document.getElementById('status');
const contactDiv = document.getElementById('contactDetails');
const editBtn = document.getElementById('edit');
const closeBtn = document.getElementById('close');

const apiUrlResponse = 'https://prod-65.westeurope.logic.azure.com:443/workflows/bc94942c62fd477dbf2f06318d94ffab/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XhViloLytf5XtTX11P-u5u_ZuIsBuOzKr13zGoh7JiI';

const apiUrlUpdate = 'https://prod-14.westeurope.logic.azure.com/workflows/aeed5485e6ee44059332d53c2236c2ed/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oygT0bsNCIf-x6ceQb4GZbh8akQ9RkXHb7lDw8Gco2I';

const payload = {
    email: 'kievonfire@gmail.com'
    // email: 'sandra.lawler@phm.co.uk'
};

fetch(apiUrlResponse, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
})
    .then(response => response.json())
    .then(data => {
        if(data.Status === 'Not VIP'){
            contactDiv.innerHTML = `
                    
                    <p>First Name:<span>${data.ContactDetails.firstName}</span></p>
                    <p>Last Name:<span>${data.ContactDetails.lastName}</span></p>
                    <p>Email:<span>${data.ContactDetails.email}</span></p>
                    <p>Mobile:<span>${data.ContactDetails.mobile}</span></p>
                    <p>Landline:<span>${data.ContactDetails.landline}</span></p>
                    <p class='hide'>ID:<span>${data.ContactDetails.id}</span></p>
                    <p class=''>ID:<span>${data.Status}</span></p>`;
                    
                    console.log(data.ContactDetails)
            
        } else if (data.Status === 'VIP'){
            contactDiv.innerHTML = `
                    <p>Company name:<span>${data.CompanyDetails.clientName}</span></p>
                    <p>Adress Line 1:<span>${data.CompanyDetails.addressLine1}</span></p>
                    <p>Adress Line 2:<span>${data.CompanyDetails.addressLine2}</span></p>
                    <p>City:<span>${data.CompanyDetails.city}</span></p>
                    <p>Postcode:<span>${data.CompanyDetails.postcode}</span></p>
                    <p>Local:<span>${data.CompanyDetails.county}</span></p>
                    <p>Country:<span>${data.CompanyDetails.country}</span></p>
                    <p>Company RegNO:<span>${data.CompanyDetails.companyRegNo}</span></p>
                    <p>Client Industry:<span>${data.CompanyDetails.clientIndustry}</span></p>
                    <p>Client size:<span>${data.CompanyDetails.clientSize}</span></p>
                    <p>Website:<span>${data.CompanyDetails.website}</span></p>
                    <p>Company ID(to hide):<span>${data.CompanyDetails.id}</span></p>
                    <p class=''>ID:<span class="status-is-vip">${data.Status}</span></p
                    ` 
                    function inputCommsContacts() {
                        const commsContactsArray = data.CompanyDetails.commsContacts;
    
                        if (commsContactsArray && commsContactsArray.length > 0) {
                        commsContactsArray.forEach(contact => {
                        contactDiv.innerHTML +=
                        `<p>Id to hide cooms contact:<span> ${contact.Id}</span></p>
                        <p>Comms contact :<span> ${contact.Value}</span></p>`
                        });
                        } else {
                        console.log('No comms contacts found.')
                        }
                    }
                    
                    inputCommsContacts();

                    function inputTechContacts() {
                        const techContactsArray = data.CompanyDetails.techContacts;
                        if (techContactsArray && techContactsArray.length > 0) {
                        techContactsArray.forEach(contact => {
                        contactDiv.innerHTML +=
                        `<p>Id to hide tech contact:<span> ${contact.Id}</span></p>
                        <p>Tech contact:<span> ${contact.Value}</span></p>`
                        });
                        } else {
                            console.log('No tech contacts found.')
                        }
                    }
                    
                    inputTechContacts();

                    let selectHTML = '<p>Contact Ditails<select>';
                    data.ContactDetails.forEach(contact => {
                        selectHTML += `<option>${contact.firstName} ${contact.lastName}</option>`;
                      });
                    selectHTML += '</select></p>';

                      contactDiv.innerHTML += selectHTML;
                           
        }
       
    })
    .catch(error => {
        console.error('Error:', error);
    });


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

    document.querySelectorAll('#form-input')[0].classList.add('first-name')
    document.querySelectorAll('#form-input')[1].classList.add('last-name')
    document.querySelectorAll('#form-input')[2].classList.add('email')
    document.querySelectorAll('#form-input')[3].classList.add('mobile')
    document.querySelectorAll('#form-input')[4].classList.add('landline')
    document.querySelectorAll('#form-input')[5].classList.add('id')
    document.querySelectorAll('#form-input')[6].classList.add('status-vip')

   
   

closeBtn.addEventListener('click', () => {
    const inputParagraphs = contactDiv.querySelectorAll('p');
  
    inputParagraphs.forEach(paragraph => {
      const input = paragraph.querySelector('input');
      if (input) {
      const textValue = input.value;
      // Create a new span element
      const newSpan = document.createElement('span');
      newSpan.textContent = textValue;
      // Replace the existing input element with the new span element
      paragraph.removeChild(input);
      paragraph.appendChild(newSpan);
    
    //   document.querySelector('.btn-submit').addEventListener('click',() => {
    //     console.log('click')
    //   })
      
      }
    }); 
    })
        closeBtn.addEventListener('click', () => {
        closeBtn.classList.remove('show')
        if(document.querySelector('.btn-submit')){
            document.querySelector('.btn-submit').remove()
        }
        
        editBtn.classList.remove('hide')
      });

    //    sending request to Core4 for updating the info
    document.querySelector('.btn-submit').addEventListener('click',() => {

        if(document.querySelector('.status-vip').value === 'Not VIP'){
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
                  "clientName": "Sure Integrated Security Limited",
                  "addressLine1": "3 Angerstein Business Park",
                  "addressLine2": "12 Horn Lane",
                  "city": "London",
                  "postcode": "E2 8HD",
                  "county": "Greenwich",
                  "country": "United Kingdom",
                  "phone": "02070330466",
                  "companyRegNo": "02677174",
                  "clientIndustry": "N - Trade (e.g. electricians and plumbing)",
                  "clientSize": "Small (5-20)",
                  "website": "http://www.sureintegrated.co.uk/",
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
        }
        console.log(document.querySelector('.status-vip').value)
  
    
      
})

})




function addShowClass() {
    contactDiv.classList.add('show');
    document.querySelector('.loader').classList.add('hide');
  }

  setTimeout(addShowClass, 1000);



  