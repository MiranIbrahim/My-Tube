const loadApiData = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();

  const categoryContainer = document.getElementById("category-container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button id="btn-color" class="rounded-md bg-gray-300 px-5 py-2" onclick="loadContent('${category.category_id}', this)">${category.category}</button>      
    `;

    categoryContainer.appendChild(div);
  });
};

const loadContent = async (categoryID, button) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await response.json();
  const boxContainer = document.getElementById("box-container");

  boxContainer.innerHTML = "";

  if (data.data.length == 0) {
    boxContainer.classList.remove("grid")
    boxContainer.innerHTML = `
    <div class="text-center mt-24">
        <div class="mb-8">
            <img src="./images/Icon.png" alt="" class="mx-auto">
        </div>
        <div class="text-2xl font-bold">
            Oops!! Sorry, There is no content here
        </div>
    </div>
    `;
  }
  else{
    boxContainer.classList.add("grid")
  }
  data.data?.forEach((content) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card">
        <figure class="rounded-lg h-44">
          <img src=${content.thumbnail} />
        </figure>
        <div class=" mt-5">
          <div class="flex gap-3">
            <div class="avatar">
              <div class="w-12 h-12 rounded-full">
                <img src=${content.authors[0].profile_picture} />
              </div>
            </div>
            <div class="">
              <h2 class="card-title">
                ${content.title}
              </h2>
              <div class="flex gap-3 items-center">
                <p class="font-normal text-gray-400 items-center">
                  ${content.authors[0].profile_name}
                </p>
                <div>
                  ${
                    content.authors[0].verified
                      ? `<img src="./images/verified.png" class="w-5 h-5" />`
                      : ""
                  }
                </div>
              </div>
              <p class="font-normal text-gray-400 items-center">
                ${content.others.views}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
    boxContainer.appendChild(div);
  });

  const buttons = document.querySelectorAll("#btn-color");

  buttons.forEach((btn) => {
    btn.classList.remove("bg-red-500", "text-white");
    btn.classList.add("bg-gray-300", "text-black");
  });

  button.classList.remove("bg-gray-300", "text-black");
  button.classList.add("bg-red-500", "text-white");
};

loadApiData();
loadContent("1000");
