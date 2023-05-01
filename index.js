function openVideoPopup(video, allVideos) {
  console.log('openVideoPopup called with video:', video);
  
  const relatedVideos = getVideosWithSameMovieTitle(allVideos, video);
  
  const popup = document.createElement('div');
  popup.className = 'video-popup';

  const overlay = document.createElement('div');
  overlay.className = 'video-popup-overlay';
  overlay.onclick = closeVideoPopup;
  popup.appendChild(overlay);

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'video-popup-wrapper';
  videoWrapper.style.overflowY = 'scroll';

  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';
	
  const videoElement = document.createElement('iframe');
  videoElement.className = 'video-popup-video';
  videoElement.width = 1120;
  videoElement.height = 630;
  videoElement.src = video.href.replace('watch?v=', 'embed/') + '?autoplay=1';
  videoElement.frameBorder = 0;
  videoElement.allow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  videoElement.allowFullscreen = true;
  videoElement.id = 'main-video';
  videoElement.addEventListener('load', () => {
	relatedVideosContainer.style.width = `${videoElement.clientWidth}px`;
  });


  const videoTitle = document.createElement('h3');
  videoTitle.innerText = 'BREAKDOWNS';
  videoTitle.style.marginTop = '20px';
  videoTitle.style.color = '#E492F5';

  const breakdownList = document.createElement('ul');

  video.breakdownLinks.forEach(link => {
    const breakdownLinkItem = document.createElement('li');
    const breakdownLink = document.createElement('a');
    breakdownLink.href = link;
    breakdownLink.target = '_blank';
    breakdownLink.textContent = link;
	breakdownLink.className = 'breakdown-link';
    breakdownLinkItem.appendChild(breakdownLink);
    breakdownList.appendChild(breakdownLinkItem);
  });
  
  if (video.breakdownLinks.length === 0) {
    videoTitle.style.display = 'none';
  }

  videoWrapper.appendChild(breakdownList);

  const movieTitleElement = document.createElement('h4');
  movieTitleElement.innerText = video.movieTitle;
  movieTitleElement.style.marginTop = '20px';
  movieTitleElement.style.color = '#E492F5';

  if (relatedVideos.length === 0) {
    movieTitleElement.style.display = 'none';
  }

	const relatedVideosContainer = document.createElement('div');
	relatedVideosContainer.className = 'video-container popup-video-container';
	relatedVideosContainer.style.display = 'flex';
	relatedVideosContainer.style.flexWrap = 'wrap';
	relatedVideosContainer.style.marginTop = '20px';

  relatedVideos.forEach((relatedVideo, index) => {
	console.log('Related video index:', index, relatedVideo); // Add this line
	const relatedVideoWrapper = document.createElement('div');
	relatedVideoWrapper.style.width = 'calc(24% - 10px)'; // Change 25% to 24%
	relatedVideoWrapper.style.marginRight = '10px';
	relatedVideoWrapper.style.marginBottom = '10px';

  
	if ((index + 1) % 4 === 0) {
		relatedVideoWrapper.style.marginRight = '0';
    }
	
    const relatedVideoThumbnail = document.createElement('img');
    relatedVideoThumbnail.src = relatedVideo.src;
	relatedVideoThumbnail.style = 'width: 100%; height: auto; cursor: pointer; border-radius: 10px;';
    relatedVideoThumbnail.onclick = () => {
      closeVideoPopup();
      openVideoPopup(relatedVideo, allVideos);
    };

    relatedVideoWrapper.appendChild(relatedVideoThumbnail);
	relatedVideosContainer.appendChild(relatedVideoWrapper);
  });
  
  relatedVideosContainer.style.display = 'flex';
  relatedVideosContainer.style.flexWrap = 'wrap';

  popupContent.appendChild(videoElement);
  popupContent.appendChild(videoTitle);
  popupContent.appendChild(breakdownList);
  popupContent.appendChild(movieTitleElement);
  popupContent.appendChild(relatedVideosContainer);

  videoWrapper.appendChild(popupContent);
  popup.appendChild(videoWrapper);
  document.body.appendChild(popup);
}



function closeVideoPopup() {
  const popup = document.querySelector('.video-popup');
  if (popup) {
    document.body.removeChild(popup);
  }
}



function getVideosWithSameMovieTitle(videos, currentVideo) {
  return videos.filter(
    video => video.movieTitle === currentVideo.movieTitle && video.href !== currentVideo.href
  );
}