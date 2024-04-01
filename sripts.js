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

const data = {
  // email: "stasdev@test.com",
  email: "clientvip@test.com",
};

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
        for (let key in contact) {
          let input = document.createElement("input");
          let label = document.createElement("label");
          let p = document.createElement("p");
          var select = document.createElement("select");

          p.textContent = `${key}: ${contact[key]}`;

          form.appendChild(p);
          input.value = contact[key];
          label.textContent = key;

          formModal.innerHTML = `
          <div>
          <p>first Name</p>
          <input value=${data.ContactDetails[0].firstName}>
          <p>lastName</p>
          <input value=${data.ContactDetails[0].lastName}>
          <p>email </p>
          <input value=${data.ContactDetails[0].email}>
          <p>landline</p>
          <input value=${data.ContactDetails[0].landline}>
          <p>mobile</p>
          <input value=${data.ContactDetails[0].mobile}>
          <p class="hide">id</p>
          <input class="hide" value=${data.ContactDetails[0].id}>
          </div>
          `;
          // formModal.append(label);
          // formModal.append(input);
        }
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
            document.querySelector(".modal").textContent = data.status;
          })
          .catch((error) => console.error("Error:", error));
      });
      changeTechBtn.classList.add("hide");
      document.querySelector(".change-comms").classList.add("hide");
      changeContactBtn.classList.add("hide");
    }

    // another condition
    else if (data.updateType === "VIP") {
      console.log("VIP");
      for (let key in data.CompanyDetails) {
        let input = document.createElement("input");
        let p = document.createElement("p");
        var select = document.createElement("select");
        var select1 = document.createElement("select");
        let label = document.createElement("label");

        p.textContent = `${key}: ${data.CompanyDetails[key]}`;
        input.value = data.CompanyDetails[key];
        label.textContent = key;
        if (key === "commsContacts") {
          for (let obj of data.CompanyDetails.commsContacts) {
            for (let key in obj) {
              p.textContent = `commsContacts: ${obj[key]}`;
              input.value = obj[key];
            }
          }
        } else if (key === "techContacts") {
          for (let obj of data.CompanyDetails.techContacts) {
            for (let key in obj) {
              p.textContent = `technicalComms: ${obj[key]}`;
              input.value = obj[key];
            }
          }
        }
        form.appendChild(p);
        formModal.innerHTML = `
        <div>
        <p>Company details</p>
        <input value="${data.CompanyDetails.clientName}">
        <p>Adress line 1</p>
        <input value="${data.CompanyDetails.addressLine1}">
        <p>Address Line 2</p>
        <input value="${data.CompanyDetails.addressLine2}">
        <p>City</p>
        <input value="${data.CompanyDetails.city}">
        <p>Post</p>
        <input value="${data.CompanyDetails.postcode}">
        <p>county</p>
        <input value="${data.CompanyDetails.county}">
        <p>Country</p>
        <input value="${data.CompanyDetails.country}">
        <p>Phone</p>
        <input value="${data.CompanyDetails.phone}">
        </div>
        <div>
        <p>Company reg no</p>
        <input value="${data.CompanyDetails.companyRegNo}">
        <p>Client Industry</p>
        <input value="${data.CompanyDetails.clientIndustry}">
        <p>Client size</p>
        <input value="${data.CompanyDetails.clientSize}">
        <p>Website</p>
        <input value="${data.CompanyDetails.website}">
        <p class="hide">id</p>
        <input class="hide" value="${data.CompanyDetails.id}">
        <p>Tech contact</p>
        <input value="${data.CompanyDetails.techContacts[0].Value}">
        <p>Comms contact</p>
        <input value="${data.CompanyDetails.commsContacts[0].Value}">
        </div>`;
      }
      data.ContactDetails.forEach((contact) => {
        var option = document.createElement("option");
        var option1 = document.createElement("option");

        option.innerHTML = `${contact.firstName} ${contact.lastName}`;
        option.setAttribute("contact-id", contact.id);

        option1.innerHTML = `${contact.firstName} ${contact.lastName}`;
        option1.setAttribute("contact-id", contact.id);

        select.classList.add("tech-select");
        select1.classList.add("comms-select");
        select.appendChild(option);
        select1.appendChild(option1);
      });

      techModal.append(select);
      commsModal.append(select1);

      techSubmitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let inputs = document.querySelectorAll("form > div > input");
        // console.log(inputs[13].value);
        inputs[13].value = select.value;
      });

      commsSubmitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let inputs = document.querySelectorAll("form > div > input");
        // console.log(inputs[14].value);
        inputs[14].value = select1.value;
      });

      changeContactBtn.addEventListener("click", (e) => {});

      // CONTACT DETAILS
      // contactSubmitBtn.addEventListener("click", (e) => {
      // e.preventDefault();

      const url =
        "https://prod-65.westeurope.logic.azure.com:443/workflows/bc94942c62fd477dbf2f06318d94ffab/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XhViloLytf5XtTX11P-u5u_ZuIsBuOzKr13zGoh7JiI";

      const dataContact = {
        email: "clientvip@test.com",
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataContact),
      };

      fetch(url, options)
        .then((response) => response.json())
        .then((dataContact) => {
          // console.log(dataContact.ContactDetails);
          dataContact.ContactDetails.forEach((obj) => {
            contactDiv.innerHTML += `
                                <div>
                                <p>First Name:</p>
                                <input class="firstname" value=${obj.firstName}>
                                <p>Last Name:</p>
                                <input class="lastname" value=${obj.lastName}>
                                <p>Email:</p>
                                <input class="email" value=${obj.email}>
                                <p>Landline:</p>
                                <input class="landline" value=${obj.landline}>
                                <p>Mobile:</p>
                                <input class="mobile" value=${obj.mobile}>
                                <p>ID:</p>
                                <input class="id" value=${obj.id}>
                                <p>VIP Status:</p>
                                <input class="vipstatus" value=${obj.vIPStatus}>
                                <p>Status:</p>
                                <input class="status" value=${obj.status}>
                                <hr>
                                </div>
                            `;
          });
        });
      // .catch((error) => console.error("Error:", error));
      // });

      let result = "";

      submitBtn.addEventListener("click", () => {
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

        let myArray = [];
        let contactInputs = document.querySelectorAll(
          ".contact-block > div > input"
        );
        // console.log(contactInputs);

        for (let i = 0; i < contactInputs.length; i += 8) {
          const contactDetails = {
            firstName: contactInputs[i].value,
            lastName: contactInputs[i + 1].value,
            email: contactInputs[i + 2].value,
            landline: contactInputs[i + 3].value,
            mobile: contactInputs[i + 4].value,
            id: parseInt(contactInputs[i + 5].value),
            vIPStatus: contactInputs[i + 6].value,
            status: contactInputs[i + 7].value,
          };

          myArray.push(contactDetails);
        }

        // console.log(myArray);
        const data = {
          updateType: "VIP",
          UserId: 18014,
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
            commsContacts: [
              {
                "@odata.type":
                  "#Microsoft.Azure.Connectors.SharePoint.SPListExpandedReference",
                Id: parseInt(
                  document
                    .querySelector(".comms-select")
                    .options[
                      document.querySelector(".comms-select").selectedIndex
                    ].getAttribute("contact-id")
                ),
                Value: document.querySelector(".comms-select").value,
              },
            ],
            techContacts: [
              {
                "@odata.type":
                  "#Microsoft.Azure.Connectors.SharePoint.SPListExpandedReference",
                Id: parseInt(
                  document
                    .querySelector(".tech-select")
                    .options[
                      document.querySelector(".tech-select").selectedIndex
                    ].getAttribute("contact-id")
                ),
                Value: document.querySelector(".tech-select").value,
              },
            ],
          },
          ContactDetails: myArray,
        };
        // console.log(data);

        fetch(apiUrlUpdate, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            document.querySelector(".modal").textContent =
              data.status + "Thanks for updating the information";
          })

          .catch((error) => console.error("Error:", error));
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
bindModal(".change-tech", ".modal__wrapper.tech", ".modal__close");
bindModal(".change-comms", ".modal__wrapper.comms", ".modal__close");
bindModal(".change-contact", ".modal__wrapper.contact", ".modal__close");

console.log("Hello! You found me 😊");
