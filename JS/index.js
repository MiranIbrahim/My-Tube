const loadApiData = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();

  // console.log(data);

  const categoryContainer = document.getElementById("category-container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `

            <button onclick="loadContent('${category.category_id}')" class="rounded-md bg-gray-300 px-5 py-2">${category.category}</button>
        `;

    categoryContainer.appendChild(div);

    loadContent(category);
  });
};

const loadContent = async (categoryID) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
  );
  const data = await response.json();
  
  const boxContainer = document.getElementById('box-container');
  
boxContainer.innerHTML = '';
  
//   console.log(data);
data.data?.forEach((content)=>{
    
    const div = document.createElement("div");  
    div.innerHTML = `
    <div class="card w-96 bg-base-100">
          <figure class="rounded-lg" >
            <img
              src=${content.thumbnail}
            />
          </figure>
          <div class=" mt-5">
            <div class="flex gap-3">
              <div class="avatar">
                <div class="w-12 h-12 rounded-full">
                  <img
                    src=${content.authors[0].profile_picture}
                  />
                </div>
              </div>
              <div class="">
                <h2 class="card-title">
                ${content.title}
                </h2>
                <p class="font-normal text-gray-400 flex gap-3 items-center">
                ${content.authors[0].profile_name}
                  <img src="./images/verified.png" alt="" class="w-5 h-5" />
                </p>
                <p class="font-normal text-gray-400 flex gap-3 items-center">
                ${content.others.views}
                </p>
              </div>
            </div>
          </div>
        </div>
    `;
    boxContainer.appendChild(div);
});
  
};



loadApiData();
loadContent("1000");