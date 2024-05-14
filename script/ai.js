console.log("AI Universe With API");

const apiData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  displayData(data.data.tools);
};

const displayData = (aiItems) => {
  const cardContainer = document.getElementById("card-container");

  aiItems.forEach((items) => {
    const div = document.createElement("div");
    div.classList = `card mt-5 bg-base-100 shadow-xl`;
    div.innerHTML = `
            <figure><img src="${items?.image}" alt="Photo Not Found" /></figure>
           <div class="card-body">
           <h2 class="card-title">Features:</h2>
           <ul>
           ${items?.features
             .map((feature) => `<li type="1">${feature}</li>`)
             .join("")} 
           </ul>
             <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
         <button class="btn btn-primary">Buy Now</button>
           </div>
           </div>

            `;

    cardContainer.appendChild(div);
  });
};

apiData();
