const newsContainer = document.querySelector("#newsContainer");
const saveButton = document.querySelector("#saveButton");
const loadSavedButton = document.querySelector("#loadSavedButton");
const loadNewsButton = document.querySelector("#loadNewsButton");
const categorySelect = document.querySelector("#categorySelect");

const firstHalf = document.querySelector(".firstHalf");
const secondHalf = document.querySelector(".secondHalf");

setTimeout(() => {
  firstHalf.style.opacity = "1";
}, 1000);

setTimeout(() => {
  secondHalf.style.opacity = "1";
}, 3000);

let savedNews = [];

const handleSavedNews = (savedItem) => {
  savedNews.push(savedItem);
  console.log(savedNews);
  alert("News saved");
  saveNews();
};

const getNews = async (category = "science") => {
  try {
    newsContainer.innerHTML = "";

    const response = await fetch(
      // `https://inshorts.deta.dev/news?category=${category}`
     `https://content.newtonschool.co/v1/pr/64806cf8b7d605c99eecde47/news?category=${category}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Data", data);

    data.data.forEach((newsItem) => {
      const div = document.createElement("div");
      div.classList.add("newsItem");
      div.innerHTML = `
        <h2>${newsItem.title}</h2>
        <div id="box">
          <img src="${newsItem.imageUrl}" class="img"></img>
          <div id="innerbox">
            <p id="nscontent">${newsItem.content} <a href="${newsItem.readMoreUrl}" style="text-decoration:none">READ MORE</a></p>
            <div class="forflex">
              <p>Date:- ${newsItem.date}</p>
              <p>Time:- ${newsItem.time}</p>
            </div>
            <div class=by>
              <p>By - <strong>${newsItem.author}</strong></p>
            </div>
          </div>
        </div>
      `;

      const button = document.createElement("button");
      button.classList.add("btton");
      button.innerHTML = "SAVE";
      button.onclick = function () {
        handleSavedNews(newsItem);
      };

      div.appendChild(button);
      newsContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Error:", error);
    // Optionally, handle the error or rethrow it
    throw error;
  }
};

const saveNews = () => {
  localStorage.setItem("savedNews", JSON.stringify(savedNews));
};

const loadSavedNews = () => {
  const savedNewsString = localStorage.getItem("savedNews");
  if (savedNewsString) {
    savedNews = JSON.parse(savedNewsString);
    newsContainer.innerHTML = "";

    savedNews.forEach((newsItem) => {
      const div = document.createElement("div");
      div.classList.add("newsItem");
      div.innerHTML = `
        <h2>${newsItem.title}</h2>
        <div id="box">
          <img src="${newsItem.imageUrl}" class="img"></img>
          <div id="innerbox">
            <p id="nscontent">${newsItem.content}</p>
          </div>
        </div>
      `;

      newsContainer.appendChild(div);
    });
  }
};

loadSavedButton.addEventListener("click", loadSavedNews);
loadNewsButton.addEventListener("click", () => {
  getNews(categorySelect.value);
});

getNews();
