document.addEventListener('DOMContentLoaded', function () {
  fetch('videoData.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const videoContainer = document.querySelector('.video-container');
      if (videoContainer) {
        createVideoElements(data);
        initializeHoverEffects();
        initializeSearchFilter();
      }
    })
    .catch(error => {
      console.error('Error fetching video data:', error);
    });
});




function createVideoElements(videos) {
  const videoContainer = document.querySelector('.video-container');

  // Reverse the order of the videos array
  const reversedVideos = videos.slice().reverse();

  // Iterate through the reversedVideos array instead of videos
  reversedVideos.forEach(video => {
    const videoThumbnail = document.createElement('a');
    videoThumbnail.href = '#';

    // Update the onclick assignment here:
    videoThumbnail.onclick = function (event) {
      event.preventDefault();
      openVideoPopup(video, videos); // Pass the videos array as the second argument
    };

    videoThumbnail.dataset.tags = JSON.stringify(video.dataTags);
    videoThumbnail.dataset.videoId = video.id; // Add the data-video-id attribute
    videoThumbnail.className = 'video-thumbnail';

    const staticImage = document.createElement('img');
    staticImage.src = video.src;
    staticImage.alt = video.alt;

    videoThumbnail.appendChild(staticImage);
    videoContainer.appendChild(videoThumbnail);
  });
}



function addBreakdownLinks(videos) {
  videos.forEach(video => {
    const breakdownLinkContainer = document.createElement('div');
    breakdownLinkContainer.className = 'breakdown-link-container';
    
    video.breakdownLinks.forEach(link => {
      const breakdownLink = document.createElement('a');
      breakdownLink.href = link;
      breakdownLink.target = '_blank';
      breakdownLink.textContent = link;
      breakdownLink.addEventListener('click', () => {
      });

      breakdownLinkContainer.appendChild(breakdownLink);
    });
    
    const videoThumbnail = document.querySelector(`[data-video-id="${video.id}"]`);
    videoThumbnail.appendChild(breakdownLinkContainer);
  });
}



function initializeHoverEffects() {
  const videoThumbnails = document.querySelectorAll('.video-thumbnail');
}



function initializeSearchFilter() {
  const searchBar = document.getElementById('searchBar');
  if (searchBar) {
    searchBar.addEventListener('input', function () {
      filterVideos(searchBar.value);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm) {
      searchBar.value = searchTerm;
      filterVideos(searchTerm);
    }
  }
}



function filterVideos(searchTerm) {
  const videoLinks = document.querySelectorAll('[data-tags]');

  videoLinks.forEach(videoLink => {
    const tags = JSON.parse(videoLink.dataset.tags);

    const searchTermLowerCase = searchTerm.toLowerCase();
    const hasMatchingTag = tags.some(tag => tag.toLowerCase().includes(searchTermLowerCase));

    if (searchTerm === '' || hasMatchingTag) {
      videoLink.style.display = 'inline-block';
    } else {
      videoLink.style.display = 'none';
    }
  });
}



const homeVfxFinder = document.querySelector('.home-vfx-finder');
if (homeVfxFinder) {
  homeVfxFinder.addEventListener('click', () => {
    homeVfxFinder.classList.add('clicked');
    setTimeout(() => homeVfxFinder.classList.remove('clicked'), 1000);
  });
}

function handleSearch(event) {
  event.preventDefault(); // Prevent the page from refreshing
  const searchBar = document.getElementById("searchBar");
  const searchTerm = searchBar.value.trim(); // Get the search term from the input field

  if (searchTerm) {
    console.log("Searching for:", searchTerm);
    // Perform your search logic here
  } else {
    console.log("Please enter a search term");
  }
}


function handleSearchFormSubmit(event, searchBarId) {
  event.preventDefault();
  const searchBar = document.getElementById(searchBarId);
  const searchValue = searchBar.value.trim();
  if (searchValue) {
    window.location.href = `videos.html?search=${encodeURIComponent(searchValue)}`;
  }
}

const homeSearchForm = document.getElementById("home-search-form");
const indexSearchForm = document.getElementById("search-form");

if (homeSearchForm) {
  homeSearchForm.addEventListener("submit", (event) => handleSearchFormSubmit(event, "homeSearchBar"));
}

if (indexSearchForm) {
  indexSearchForm.addEventListener("submit", (event) => handleSearchFormSubmit(event, "searchBar"));
}




const addVideoButton = document.getElementById("add-video-button");
if (addVideoButton) {
  addVideoButton.addEventListener("click", () => {
    window.location.href = "add-video.html";
  });
}
