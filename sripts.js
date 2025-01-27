// const data = {
//   email: localStorage.getItem('userEmail')
// };

const url =
  "https://prod-65.westeurope.logic.azure.com:443/workflows/bc94942c62fd477dbf2f06318d94ffab/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XhViloLytf5XtTX11P-u5u_ZuIsBuOzKr13zGoh7JiI";

const apiUrlUpdate =
  "https://prod-14.westeurope.logic.azure.com/workflows/aeed5485e6ee44059332d53c2236c2ed/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oygT0bsNCIf-x6ceQb4GZbh8akQ9RkXHb7lDw8Gco2I";

let commsDiv = document.querySelector(".comms");
let techDiv = document.querySelector(".tech");

let techSubmitBtn = document.querySelector(".tech-submit");
let commsSubmitBtn = document.querySelector(".comms-submit");
let contactSubmitBtn = document.querySelector(".contact-submit");

let contactDiv = document.querySelector(".contact-block");
let form = document.getElementById("form");
let formModal = document.getElementById("modal-form");
let techModal = document.getElementById("tech-form");
let commsModal = document.getElementById("comms-form");
let contactModal = document.getElementById("contact-form");
let formChangeModal = document.getElementById("modal-change-form");

const loader = document.querySelector(".loader");
const editBtn = document.getElementById("edit");

const submitBtn = document.querySelector(".modal__submit");
const changeTechBtn = document.querySelector(".change-tech");

const changeContactBtn = document.querySelector(".change-contact");

let maxSelects = 3;

let techNamesArray = [];
let commsNamesArray = [];

const data = {
  email: localStorage.getItem("userEmail") || "kievonfire@gmail.com",
};

// Add this at the top with other global variables
let pendingContactChanges = [];

function addClassToSelectedOption(selectElement, className) {
  // Get all options in the select element
  const options = selectElement.options;

  // Remove the class from all options
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove(className);
  }

  // Get the selected option
  const selectedIndex = selectElement.selectedIndex;
  if (selectedIndex !== -1) {
    // Add the class to the selected option
    options[selectedIndex].classList.add(className);
  }
}

function addClassToSelectedOptionComms(selectElement, className) {
  // Get all options in the select element
  const options = selectElement.options;

  // Remove the class from all options
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove(className);
  }

  // Get the selected option
  const selectedIndex = selectElement.selectedIndex;
  if (selectedIndex !== -1) {
    // Add the class to the selected option
    options[selectedIndex].classList.add(className);
  }
}

async function addContactNamesToSelect(selectElement) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const dataFetched = await response.json();

    dataFetched.ContactDetails.forEach((optionText, index) => {
      const option = document.createElement("option");
      option.textContent = optionText.firstName + " " + optionText.lastName;
      option.value = optionText.firstName + " " + optionText.lastName;
      option.setAttribute("data-id", optionText.id);
      if (index === 0) {
        option.classList.add("tech-option-selected");
      }
      selectElement.appendChild(option);
    });

    // Add event listener to selectElement parameter
    selectElement.addEventListener("change", function () {
      addClassToSelectedOption(selectElement, "tech-option-selected");
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function addContactNamesToSelectComms(selectElement) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const dataFetched = await response.json();

    dataFetched.ContactDetails.forEach((optionText, index) => {
      const option = document.createElement("option");
      option.textContent = optionText.firstName + " " + optionText.lastName;
      option.value = optionText.firstName + " " + optionText.lastName;
      option.setAttribute("data-id", optionText.id);
      if (index === 0) {
        option.classList.add("comms-option-selected");
      }
      selectElement.appendChild(option);
    });

    // Add event listener to selectElement parameter
    selectElement.addEventListener("change", function () {
      addClassToSelectedOptionComms(selectElement, "comms-option-selected");
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    //not VIP user
    if (data.updateType === "Not VIP") {
      console.log("Not VIP");
      for (let contact of data.ContactDetails) {
        // for (let key in contact) {
        let input = document.createElement("input");
        let label = document.createElement("label");
        let p = document.createElement("p");
        var select = document.createElement("select");

        // p.textContent = `${key}: ${contact[key]}`;

        p.innerHTML = `<p>First Name : ${data.ContactDetails[0].firstName}</p>
          <p>Last Name: ${data.ContactDetails[0].lastName}</p>
          <p>Email: ${data.ContactDetails[0].email}</p>
          <p>Land Line: ${data.ContactDetails[0].landline}</p>
          <p>Mobile: ${data.ContactDetails[0].mobile}</p>
          <p>id ${data.ContactDetails[0].id}</p>`;

        form.appendChild(p);
        // input.value = contact[key];
        // label.textContent = key;

        formModal.innerHTML = `
          <div>
          <p>First Name</p>
          <input value=${data.ContactDetails[0].firstName}>
          <p>Last Name</p>
          <input value=${data.ContactDetails[0].lastName}>
          <p>Email </p>
          <input value=${data.ContactDetails[0].email}>
          <p>Landline</p>
          <input value=${data.ContactDetails[0].landline}>
          <p>Mobile</p>
          <input value=${data.ContactDetails[0].mobile}>
          <p class="hide">id</p>
          <input class="hide" value=${data.ContactDetails[0].id}>
          </div>
          `;

        // }
      }
      submitBtn.addEventListener("click", () => {
        let inputs = formModal.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
          inputs[0].classList.add("firstname");
          inputs[1].classList.add("lastName");
          inputs[2].classList.add("email");
          inputs[3].classList.add("landline");
          inputs[4].classList.add("mobile");
          inputs[5].classList.add("id");
        }
        const data = {
          updateType: "Not VIP",
          ContactDetails: [
            {
              email: document.querySelector(".email").value,
              firstName: document.querySelector(".firstname").value,
              id: parseInt(document.querySelector(".id").value),
              landline: document.querySelector(".landline").value,
              lastName: document.querySelector(".lastName").value,
              mobile: document.querySelector(".mobile").value,
              status: "Active",
            },
          ],
        };

        fetch(apiUrlUpdate, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            document.querySelector(".modal").textContent =
              "Updated!Your information has been successfully submitted. Our team will review the details provided and ensure that the system is accurately updated.";
            setTimeout(function () {
              location.reload();
            }, 5000);
          })
          .then((data) => {})
          .catch((error) => console.error("Error:", error));
      });
      changeTechBtn.classList.add("hide");
      document.querySelector(".change-comms").classList.add("hide");
      changeContactBtn.classList.add("hide");
    }

    // another condition
    else if (data.updateType === "VIP") {
      let input = document.createElement("input");
      let p = document.createElement("p");
      var select = document.createElement("select");
      var select1 = document.createElement("select");
      let label = document.createElement("label");

      console.log(data.CompanyDetails);
      p.innerHTML = `<p>Client Name : ${data.CompanyDetails.clientName}</p>
         <p class="hide vipUserId">${data.UserId}</p>
         <p>Address Line 1 : ${data.CompanyDetails.addressLine1}</p>
         <p>Address Line 2 : ${data.CompanyDetails.addressLine2}</p>
         <p>Post Сode : ${data.CompanyDetails.postcode}</p>
         <p>Phone : ${data.CompanyDetails.phone}</p>
         <p>Company Reg. Number : ${data.CompanyDetails.companyRegNo}</p>
         <p>City : ${data.CompanyDetails.city}</p>
         <p>County : ${data.CompanyDetails.county}</p>
         <p>Country : ${data.CompanyDetails.country}</p>
         <p>Client Industry : ${data.CompanyDetails.clientIndustry}</p>
         <p>Client Size : ${data.CompanyDetails.clientSize}</p>
         <p>Website : ${data.CompanyDetails.website}</p>
         <p>Comms Contacts : ${data.CompanyDetails.commsContacts.map(
           (item) => item.Value
         )}</p>
         <p>Technical Contacts : ${data.CompanyDetails.techContacts.map(
           (item) => item.Value
         )}</p>
         `;

      form.appendChild(p);
      formModal.innerHTML = `
        <div>
        <p>Client Name</p>
        <input value="${data.CompanyDetails.clientName}">
        <p>Address Line 1</p>
        <input value="${data.CompanyDetails.addressLine1}">
        <p>Address Line 2</p>
        <input value="${data.CompanyDetails.addressLine2}">
        <p>City</p>
        <input value="${data.CompanyDetails.city}">
        <p>Post Code</p>
        <input value="${data.CompanyDetails.postcode}">
        <p>County</p>
        <input value="${data.CompanyDetails.county}">
        <p>Country</p>
        <input value="${data.CompanyDetails.country}">
        <p>Phone</p>
        <input value="${data.CompanyDetails.phone}">
        </div>
        <div>
        <p>Company Reg. Number</p>
        <input value="${data.CompanyDetails.companyRegNo}">
        <p>Client Industry</p>
         <input class="hide" value="${data.CompanyDetails.clientIndustry}">
        <select selected="${data.CompanyDetails.clientIndustry}">
        <option value="${data.CompanyDetails.clientIndustry}">${
        data.CompanyDetails.clientIndustry
      }</option>
        <option>A - Accountancy & Legal</option>
              <option>B - Arts, Entertainment & Recreation</option>
                    <option>C - Building & Construction (e.g. architects, planning)</option>
                          <option>D - Business Services: (e.g. Accelerator)</option>
                                <option>E - Creative & Digital Agency</option>
                                      <option>F - Education</option>
                                        <option>G - Financial Services</option>
                                           <option>H - HR</option>
                                              <option>I - Insurance</option>
                                                 <option>J - Production Design and Manufacture</option>
                                                  <option>K - Recruitment</option>
                                                   <option>L - Retail Sector: (e.g. Skandium)</option>
                                                    <option>M - Restaurants, Bars, Food</option>
                                                     <option>N - Trade (e.g. electricians and plumbing)</option>
                                                       <option>O - Non-for-Profit</option>
                                                         <option>P - Health</option>
                                                           <option>Q - Energy</option>
                                                             <option>Unsure</option>
        </select>
        <p>Client Size </p>
           <input class="hide" value="${data.CompanyDetails.clientSize}">
     <select name="" id="">
     <option class="" value="">Unsure</option>
      <option class="" value="">Home</option>
      <option class="" value="">Micro (1 -5)</option>
      <option class="" value="">Small (5 - 20)</option>
      <option class="" value="">Medium (21 -50)</option>
      
      <option class="" value="">Large (51+)</option>
</select>
        

     
        <p>Website</p>
        <input value="${data.CompanyDetails.website}">
        <p class="hide">id</p>
        <input class="hide" value="${data.CompanyDetails.id}">
       <p>Technical Contacts: </p>
       <div class="hide tech-contact-id">${data.CompanyDetails.techContacts
         .map((item) => "<p>" + item.Id + "</p>")
         .join("")}</div>
        <div class="technical-contact">${data.CompanyDetails.techContacts
          .map((item) => "<p>" + item.Value.replace(/,/g, "") + "</p>")
          .join("")}
        </div>
        <p>Comms Contacts: </p>
         <div class="hide comms-contact-id">${data.CompanyDetails.commsContacts
           .map((item) => "<p>" + item.Id + "</p>")
           .join("")}</div>
         <div class="comms-contact">${data.CompanyDetails.commsContacts
           .map((item) => "<p>" + item.Value.replace(/,/g, "") + "</p>")
           .join("")}
         </div>
        </div>`;
      data.ContactDetails.forEach((contact) => {
        var option = document.createElement("option");
        var option1 = document.createElement("option");

        option.innerHTML = `${contact.firstName} ${contact.lastName}`;
        option.setAttribute("contact-id", contact.id);

        option1.innerHTML = `${contact.firstName} ${contact.lastName}`;
        option1.setAttribute("contact-id", contact.id);

        // select.classList.add("tech-select");
        select1.classList.add("comms-select");
        select.appendChild(option);
        select1.appendChild(option1);
      });

      const contactNames = [];
      data.ContactDetails.forEach((element) => {
        contactNames.push(`${element.firstName} ${element.lastName}`);
        // console.log(contactNames);
      });

      const addButton = document.createElement("button");
      addButton.innerText = "Add Contact";
      addButton.classList.add("btn");

      const addButtonComms = document.createElement("button");
      addButtonComms.innerText = "Add Contact";
      addButtonComms.classList.add("btn");

      addButton.onclick = (e) => {
        e.preventDefault();

        document.querySelector(".tech-notification").innerHTML =
          "please hit save, close the window and submit the from to apply your changes";
        const selectCount = techModal.querySelectorAll("select").length;
        if (selectCount < maxSelects) {
          addSelectWithOptions("New Contact");
        } else {
          alert("You can't add more than 3 contact.");
        }
      };
      data.CompanyDetails.techContacts.forEach((contact) => {
        addSelectWithOptions(contact.Value);
      });

      addButtonComms.onclick = (e) => {
        e.preventDefault();
        document.querySelector(".comms-notification").innerHTML =
          "please hit save, close the window and submit the from to apply your changes";
        // Check the number of select elements before adding a new one
        const selectCount = commsModal.querySelectorAll("select").length;
        if (selectCount < 3) {
          addSelectWithOptionsComms("New Contact");
        } else {
          alert("You can't add more than 3 selects.");
        }
      };
      data.CompanyDetails.commsContacts.forEach((contact) => {
        addSelectWithOptionsComms(contact.Value);
      });

      function addSelectWithOptions(contactValue) {
        const containerDiv = document.createElement("div");
        const infoDiv = document.createElement("div");
        infoDiv.textContent = "current user:" + contactValue + " ";

        const selectElement = document.createElement("select");
        // selectElement.classListadd.('tech-select')
        addContactNamesToSelect(selectElement); // Populate select with options

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = (e) => {
          e.preventDefault();
          document.querySelector(".tech-notification").innerHTML =
            "please hit save, close the window and submit the from to apply your changes";
          const selectCount = techModal.querySelectorAll("select").length - 1;
          if (selectCount < 1) {
            alert("You need at least 1 technical contact.");
            deleteButton.disabled = true;
          } else {
            containerDiv.remove();
          }
        };
        containerDiv.appendChild(infoDiv);
        containerDiv.classList.add("wrapper-tech");
        deleteButton.classList.add("delete-button");
        selectElement.classList.add("tech-select");
        containerDiv.appendChild(selectElement);
        containerDiv.appendChild(deleteButton);
        techModal.prepend(containerDiv);
        techModal.appendChild(addButton);
      }

      function addSelectWithOptionsComms(contactValue) {
        const containerDivComms = document.createElement("div");
        const infoDivComms = document.createElement("div");
        infoDivComms.textContent = "current " + contactValue + " ";

        const selectElementComms = document.createElement("select");
        addContactNamesToSelectComms(selectElementComms); // Populate select with options

        const deleteButtonComms = document.createElement("button");
        deleteButtonComms.innerText = "Delete";
        deleteButtonComms.onclick = (e) => {
          e.preventDefault();
          document.querySelector(".comms-notification").innerHTML =
            "please hit save, close the window and submit the from to apply your changes";
          const selectCount = commsModal.querySelectorAll("select").length - 1;
          if (selectCount < 1) {
            alert("You need at least 1 comms contact.");
            deleteButton.disabled = true;
          } else {
            containerDivComms.remove();
          }
        };

        containerDivComms.appendChild(infoDivComms);
        containerDivComms.classList.add("wrapper-comms");
        deleteButtonComms.classList.add("delete-button");
        selectElementComms.classList.add("comms-select");
        containerDivComms.appendChild(selectElementComms);
        containerDivComms.appendChild(deleteButtonComms);
        commsModal.prepend(containerDivComms);
        commsModal.appendChild(addButtonComms);
      }

      // data.CompanyDetails.commsContacts.forEach((contact) => {
      //   const containerDiv = document.createElement("div");
      //   const infoDiv = document.createElement("div");
      //   infoDiv.textContent = "current user: " + contact.Value + " ";

      //   const selectElement = document.createElement("select");
      //   function addContactNamesToSelect() {
      //     contactNames.forEach(function (optionText) {
      //       const option = document.createElement("option");
      //       option.textContent = optionText;
      //       selectElement.appendChild(option);
      //     });
      //   }
      //   addContactNamesToSelect();

      //   const deleteButton = document.createElement("button");
      //   deleteButton.innerText = "Delete";
      //   deleteButton.onclick = () => {
      //     console.log("click");
      //     containerDiv.remove();
      //   };

      //   containerDiv.appendChild(infoDiv);
      //   containerDiv.classList.add("wrapper-tech");
      //   deleteButton.classList.add("delete-button");
      //   selectElement.classList.add("tech-select");
      //   containerDiv.appendChild(selectElement);
      //   containerDiv.appendChild(deleteButton);

      //   commsModal.prepend(containerDiv);
      //   // techModal.append(containerDiv);
      //   // wrapper.appendChild(containerDiv);
      // });

      // console.log(document.querySelectorAll(".technical-contact > p"));

      let techDivId = document.querySelectorAll(".tech-contact-id > p");
      let commsDivId = document.querySelectorAll(".comms-contact-id > p");
      let techDetails = {};
      let commsDetails = {};

      for (let i = 0; i < techDivId.length; i++) {
        techDetails = {
          "@odata.type":
            "#Microsoft.Azure.Connectors.SharePoint.SPListExpandedReference",
          Id: parseInt(techDivId[i].innerHTML),
          // Value: techInputs[i].value,
        };
        techNamesArray.push(techDetails);
      }

      for (let i = 0; i < commsDivId.length; i++) {
        commsDetails = {
          "@odata.type":
            "#Microsoft.Azure.Connectors.SharePoint.SPListExpandedReference",
          Id: parseInt(commsDivId[i].innerHTML),
          // Value: techInputs[i].value,
        };
        // console.log(commsDetails);
        commsNamesArray.push(commsDetails);
      }

      techSubmitBtn.addEventListener("click", (e) => {
        techNamesArray = [];
        e.preventDefault();
        let techInputs = document.querySelectorAll(".tech-option-selected");
        // let commsArray = [];
        for (let i = 0; i < techInputs.length; i++) {
          const techDetails = {
            "@odata.type":
              "#Microsoft.Azure.Connectors.SharePoint.SPListExpandedReference",
            Id: parseInt(techInputs[i].getAttribute("data-id")),
            Value: techInputs[i].value,
          };

          techNamesArray.push(techDetails);
          console.log(techNamesArray);
        }
      });

      commsSubmitBtn.addEventListener("click", (e) => {
        commsNamesArray = [];
        e.preventDefault();
        let commsInputs = document.querySelectorAll(".comms-option-selected");
        // let commsArray = [];
        for (let i = 0; i < commsInputs.length; i++) {
          const commsDetails = {
            "@odata.type":
              "#Microsoft.Azure.Connectors.SharePoint.SPListExpandedReference",
            Id: parseInt(commsInputs[i].getAttribute("data-id")),
            Value: commsInputs[i].value,
          };

          commsNamesArray.push(commsDetails);
          console.log(commsNamesArray);
        }
      });

      changeContactBtn.addEventListener("click", (e) => {});

      // CONTACT DETAILS
      const dataContact = {
        email: localStorage.getItem("userEmail"),
      };

      populateContactDetails();

      let result = "";

      // console.log();

      submitBtn.addEventListener("click", () => {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Please wait...";
        submitBtn.style.backgroundColor = "gray";

        // Get all form inputs
        let inputs = formModal.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
          inputs[0].classList.add("clientName");
          inputs[1].classList.add("addressLine1");
          inputs[2].classList.add("addressLine2");
          inputs[3].classList.add("city");
          inputs[4].classList.add("postcode");
          inputs[5].classList.add("county");
          inputs[6].classList.add("country");
          inputs[7].classList.add("phone");
          inputs[8].classList.add("companyRegNo");
          inputs[9].classList.add("clientIndustry");
          inputs[10].classList.add("clientSize");
          inputs[11].classList.add("website");
          inputs[12].classList.add("id");
        }

        const data = {
          updateType: "VIP",
          UserId: parseInt(document.querySelector(".vipUserId").innerText),
          CompanyDetails: {
            clientName: document.querySelector(".clientName").value,
            addressLine1: document.querySelector(".addressLine1").value,
            addressLine2: document.querySelector(".addressLine2").value,
            city: document.querySelector(".city").value,
            postcode: document.querySelector(".postcode").value,
            county: document.querySelector(".county").value,
            country: document.querySelector(".country").value,
            phone: document.querySelector(".phone").value,
            companyRegNo: document.querySelector(".companyRegNo").value,
            clientIndustry: document.querySelector(".clientIndustry").value,
            clientSize: document.querySelector(".clientSize").value,
            website: document.querySelector(".website").value,
            id: parseInt(document.querySelector(".id").value),
            commsContacts: commsNamesArray,
            techContacts: techNamesArray,
          },
          ContactDetails: pendingContactChanges.length
            ? pendingContactChanges
            : collectContactData(), // Use pending changes if available
        };

        console.log("Submitting data:", data);

        // Send the data to the server
        fetch(apiUrlUpdate, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            document.querySelector(".modal").textContent =
              "Updated! Your information has been successfully submitted. Our team will review the details provided and ensure that the system is accurately updated.";

            // Clear pending changes
            pendingContactChanges = [];

            setTimeout(function () {
              location.reload();
            }, 5000);
          })
          .catch((error) => {
            console.error("Error:", error);
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Submit";
            submitBtn.style.backgroundColor = "#2196f3";
            alert("An error occurred while saving. Please try again.");
          });
      });
    }

    loader.classList.add("hide");
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

// Modal
function bindModal(trigger, modal, close) {
  (trigger = document.querySelector(trigger)),
    (modal = document.querySelector(modal)),
    (close = document.querySelector(close));

  const body = document.body;

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
    body.classList.add("locked");
  });
  close.addEventListener("click", () => {
    console.log("click");
    modal.style.display = "none";
    body.classList.remove("locked");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      body.classList.remove("locked");
    }
  });
}

bindModal(".modal__btn", ".modal__wrapper", ".modal__close");
bindModal(".change-tech", ".modal__wrapper.tech", ".tech .modal__close");
bindModal(".change-comms", ".modal__wrapper.comms", ".comms .modal__close");
bindModal(
  ".change-contact",
  ".modal__wrapper.contact",
  ".modal__close-contact"
);

document
  .querySelector(".modal__close-contact")
  .addEventListener("click", () => {
    console.log("click");
  });

// Add this function to handle contact population
async function populateContactDetails() {
  try {
    const contactDiv = document.querySelector(".contact-block");
    if (!contactDiv) {
      console.error("Contact block element not found");
      return;
    }

    // Show loading state
    contactDiv.innerHTML = '<div class="loader"></div>';

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // Add Accept header
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail") || "kievonfire@gmail.com",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    // Verify the response data structure
    if (
      !responseData.ContactDetails ||
      !Array.isArray(responseData.ContactDetails)
    ) {
      throw new Error("Invalid response format");
    }

    // Clear existing content
    contactDiv.innerHTML = "";

    // Add header first
    document.querySelector(".contacts-section")?.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="contacts-header">
        <h2>Contact Management</h2>
        <p>View and manage your contact details below</p>
      </div>
    `
    );

    // Populate contact details
    responseData.ContactDetails.forEach((obj) => {
      if (!obj) return; // Skip if contact object is null/undefined

      contactDiv.innerHTML += `
        <div class="card">
          <div class="contact-fields">
            <p>First Name:</p>
            <input class="firstname" value="${
              obj.firstName || ""
            }" placeholder="First Name">
            
            <p>Last Name:</p>
            <input class="lastname" value="${
              obj.lastName || ""
            }" placeholder="Last Name">
            
            <p>Email:</p>
            <input class="email" value="${
              obj.email || ""
            }" placeholder="Email Address">
            
            <p>Landline:</p>
            <input class="landline" value="${
              obj.landline || ""
            }" placeholder="Landline Number">
            
            <p>Mobile:</p>
            <input class="mobile" value="${
              obj.mobile || ""
            }" placeholder="Mobile Number">
            
            <p class="hide">ID:</p>
            <input class="hide id" value="${obj.id || ""}">
            
            <p>VIP Status:</p>
            <input class="vipstatus hide" value="${obj.vIPStatus || "No"}">
            <select class="status-select vip-status">
              <option value="Yes" ${
                obj.vIPStatus === "Yes" ? "selected" : ""
              }>Yes</option>
              <option value="No" ${
                obj.vIPStatus === "No" ? "selected" : ""
              }>No</option>
            </select>
            
            <p>Contact Status:</p>
            <input class="status hide" value="${obj.status || "Inactive"}">
            <select class="status-select contact-status">
              <option value="Active" ${
                obj.status === "Active" ? "selected" : ""
              }>Active</option>
              <option value="Inactive" ${
                obj.status === "Inactive" ? "selected" : ""
              }>Inactive</option>     
            </select>
          </div>
        </div>
      `;
    });

    // Add error handling for empty contact list
    if (!responseData.ContactDetails.length) {
      contactDiv.innerHTML = `
        <div class="no-contacts">
          <p>No contacts found</p>
        </div>
      `;
    }

    // Update this part in populateContactDetails()
    document.querySelector(".contacts-section")?.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="contacts-header">
          <h2>Contact Management</h2>
          <p>View and manage your contact details below</p>
      </div>
      <div class="contact-block-wrapper">
          ${contactDiv.outerHTML}
      </div>
      `
    );
  } catch (error) {
    console.error("Error populating contact details:", error);
    // Show error state to user
    contactDiv.innerHTML = `
      <div class="error-message">
        <p>Error loading contacts. Please try again later.</p>
        <button onclick="populateContactDetails()" class="btn">Retry</button>
      </div>
    `;
  }
}

// Add error handling for the initial fetch
window.addEventListener("load", () => {
  populateContactDetails().catch((error) => {
    console.error("Failed to load contacts:", error);
  });
});

// Add this function to collect contact data
function collectContactData() {
  const contactCards = document.querySelectorAll(".contact-block .card");
  const contactsData = [];

  contactCards.forEach((card) => {
    const contactData = {
      firstName: card.querySelector(".firstname").value,
      lastName: card.querySelector(".lastname").value,
      email: card.querySelector(".email").value,
      landline: card.querySelector(".landline").value,
      mobile: card.querySelector(".mobile").value,
      id: parseInt(card.querySelector(".id").value) || 0,
      vIPStatus: card.querySelector(".vip-status").value,
      status: card.querySelector(".contact-status").value,
    };
    contactsData.push(contactData);
  });

  return contactsData;
}

// Update the contact submit button handler
contactSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Collect the current contact data
  const contactsData = collectContactData();

  // Store the changes for later submission
  pendingContactChanges = contactsData;

  // Show confirmation to user
  document.querySelector(".contact-notification")?.remove(); // Remove existing notification if any
  const notification = document.createElement("div");
  notification.className = "contact-notification";
  notification.innerHTML = `
        <p class="success-message">Contact changes saved. Click Submit to apply all changes.</p>
    `;
  document.querySelector(".modal__wrapper.contact").appendChild(notification);

  // Close the contact modal
  document.querySelector(".modal__wrapper.contact").style.display = "none";
  document.body.classList.remove("locked");
});

// Add some CSS for the notification
const style = document.createElement("style");
style.textContent = `
    .contact-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    .success-message {
        margin: 0;
        color: white !important;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
