import {contactDiv} from './script.js'




const apiUrlResponse = 'https://prod-65.westeurope.logic.azure.com:443/workflows/bc94942c62fd477dbf2f06318d94ffab/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XhViloLytf5XtTX11P-u5u_ZuIsBuOzKr13zGoh7JiI';

const payload = {
    email: 'tracy@sureintegrated.co.uk'
    // email: 'kievonfire@gmail.com'
};

export async function fetchDataAndDisplay() {
    const loader = document.querySelector('.loader'); 
    loader.classList.remove('hide'); 

    try {
        const response = await fetch(apiUrlResponse, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        loader.classList.add('hide'); 

        if (data.updateType === 'Not VIP') {
            contactDiv.innerHTML = `
        <p>First Name:<span>${data.ContactDetails[0].firstName}</span></p>
        <p>Last Name:<span>${data.ContactDetails[0].lastName}</span></p>
        <p>Email:<span>${data.ContactDetails[0].email}</span></p>
        <p>Mobile:<span>${data.ContactDetails[0].mobile}</span></p>
        <p>Landline:<span>${data.ContactDetails[0].landline}</span></p>
        <p class='hide'>ID:<span>${data.ContactDetails[0].id}</span></p>
        <p class=''>ID:<span>${data.updateType}</span></p>
        `;
            console.log(data.ContactDetails[0]);
        } else if (data.updateType === 'VIP') {
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
        <p class=''>ID:<span class="status-is-vip">${data.Status}</span></p>
        `;

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

            let selectHTML = '<div class="row"><div><p class="block">Contact Details</p><select>';
            data.ContactDetails.forEach(contact => {
                selectHTML += `<option>${contact.firstName} ${contact.lastName}</option>`;
            });
            selectHTML += '</select></div><button class="btn modal__btn" id="check-active">Cheack Active-Inactive clients</button></div>';

            contactDiv.innerHTML += selectHTML;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}





function handleButtonClick(event) {
    const clickedElement = event.target;  
    if (clickedElement.id === 'check-active') {
     
     
    } else {
        console.log('nope')
    }
  }
  
  const parentContainer = document.getElementById('contactDetails');
  parentContainer.addEventListener('click', handleButtonClick);

