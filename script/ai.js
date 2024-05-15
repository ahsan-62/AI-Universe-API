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
    div.id = "card-full";
    div.setAttribute = ("onclick", "modalView()");
    div.innerHTML = `
            <figure><img src="${items?.image}" alt="image not found" /></figure>
           <div class="card-body">
           <h2 class="card-title">Features:</h2>
           <ul>
           ${items?.features
             .map((feature) => `<li type="1">${feature}</li>`)
             .join("")} 
           </ul>
           <h2 class="mt-5 text-xl font-bold ">${items?.name}</h2>
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
const modalView = () => {
  console.log("modal view");
};

apiData();
