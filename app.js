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

const savedNews = [];
// const handleSavedNews = (savedItem) => {
//   savedNews.push(savedItem);
//   console.log(savedNews);
//   alert("News saved");
//   saveNews(savedItem);
// };

const handleSavedNews = (savedItem) => {
  // Create an object to store the news item and its image
  const news = {
    title: savedItem.title,
    content: savedItem.content,
    imageUrl: savedItem.imageUrl
  };

  savedNews.push(news);
  console.log(savedNews);
  alert("News saved");
  saveNews(savedNews);
}; 

// const getNews = (category = "science") => {
//   newsContainer.innerHTML = "";
//   fetch(`https://inshorts.deta.dev/news?category=${category}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Data", data);
//       data.data.forEach((newsItem) => {
//         const div = document.createElement("div");
//         div.classList.add("newsItem");
//         div.innerHTML = `
//           <h2>${newsItem.title}</h2>
//           <div id="box">
//           <img src="${newsItem.imageUrl}" class="img"></img>
//           <div id="innerbox">
//           <p id="nscontent">${newsItem.content} <a href="${newsItem.readMoreUrl}" style="text-decoration:none">READ MORE</a></p>
//           <div class="forflex">
//           <p>Date:- ${newsItem.date}</p>
//           <p>Time:- ${newsItem.time}</p>
//           </div>
//           <div class=by>
//           <p>By - <strong>${newsItem.author}</strong></p>
//           </div>
//           </div>
//           </div>
//         `;
//         const button = document.createElement("button");
//         button.classList.add("btton");
//         button.innerHTML = "SAVE";
//         button.onclick = function () {
//           handleSavedNews(newsItem);
//         };

//         div.appendChild(button);
//         newsContainer.appendChild(div);
//       });
//     });
// };

const getNews = async (category = "science") => {
  try {
    newsContainer.innerHTML = "";

    const response = await fetch(
      `https://inshorts.deta.dev/news?category=${category}`
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

const saveNews = (id) => {
  const newss = Array.from(document.querySelectorAll(".newsItem")).map(
    (newsItem) => {
      return {
        title: newsItem.querySelector("h2").textContent,
        content: newsItem.querySelector("#nscontent").textContent,
      };
    }
  );
  console.log("saved news", id);
  localStorage.setItem("savedNews", JSON.stringify(id));
  JSON.parse(localStorage.getItem("newss"));
};

const loadSavedNews = () => {
  console.log("Saved News", savedNews);
  newsContainer.innerHTML = "";

  if (!savedNews) {
    return;
  }
  savedNews.forEach((newsItem) => {
    const div = document.createElement("div");
    div.classList.add("newsItem");
    div.innerHTML = `
    <h2>${newsItem.title}</h2>
    <p>${newsItem.content}</p>
    
    `;
    newsContainer.appendChild(div);
  });
};

loadSavedButton.addEventListener("click", loadSavedNews);
loadNewsButton.addEventListener("click", () => {
  getNews(categorySelect.value);
});

getNews();
