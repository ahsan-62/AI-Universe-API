console.log("AI Universe With API");

const apiData = async (loadMore) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const dataAll = data.data.tools;

  const loadMoreButton = document.getElementById("load-more");
  if (dataAll.length > 6 && !loadMore) {
    loadMoreButton.classList.remove("hidden");
  } else {
    loadMoreButton.classList.add("hidden");
  }

  if (loadMore) {
    displayData(dataAll);
  } else {
    const sliceData = dataAll.slice(0, 6);
    displayData(sliceData);
  }
};

const displayData = (aiItems) => {
  const cardContainer = document.getElementById("card-container");

  cardContainer.textContent = "";

  aiItems.forEach((items) => {
    const div = document.createElement("div");
    div.classList = `card mt-5 bg-base-100 shadow-xl`;

    div.innerHTML = `
            <figure><img src="${items?.image}" alt="image not found" /></figure>
           <div class="card-body">
           <h2 class="card-title">Features:</h2>
           <ul>
           ${items?.features
             .map((feature) => `<li type="1">${feature}</li>`)
             .join("")} 
           </ul>
           <h2 onclick="modalView('${
             items?.id
           }')" class="mt-5 text-xl font-bold ">${items?.name}</h2>
        <div class="card-actions justify-start">
         <p><i class="fa-solid fa-calendar-days"></i> ${items?.published_in}</p>
        </div>
           </div>
           </div>

            `;

    cardContainer.appendChild(div);
  });
};

const loadMore = () => {
  apiData(true);
};

//Modal View
const modalView = (id) => {
  modalData(id);
};

//Modal data

const modalData = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  console.log(id);
  const data = await res.json();
  // console.log(data.data.name);
  const dataAll = data.data;
  displayModalData(dataAll);
};

const displayModalData = (dataAll) => {
  const modalBox = document.getElementById("modalBox");
  const features = dataAll.features;
  console.log(features);

  let featuresList = "";

  for (let i in features) {
    featuresList += `<li type="1">${features[i].feature_name}</li>`;
  }

  console.log(featuresList);

  modalBox.innerHTML = `
  <dialog id="mod_box" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="font-bold text-lg">${dataAll.description}</h3>
            <h2 class="mt-5 text-xl bg-gradient-to-t from-yellow-500 to-red-500  font-bold">Features:</h2>
            <ul class="pl-5 text-red-500 font-bold  ">
          ${featuresList}
            </ul>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
  
  `;
  mod_box.showModal();
};

apiData();
