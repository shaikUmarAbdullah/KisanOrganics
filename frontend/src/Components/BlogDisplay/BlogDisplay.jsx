import React from 'react';
import './BlogDisplay.css';

const BlogDisplay = ({ blog }) => {
  return (
    <div className="blog-display">
      <h2>{blog.name}</h2>
      <div className="blog-info">
        {blog.info.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <h3>Images</h3>
      <div className="image-gallery collage">
        {blog.images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
      <p><strong>Usage Instructions:</strong> {blog.usageInstructions.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}</p>
      {blog.relatedVideos.length > 0 && (
        <div className="related-videos">
          <h3>Related Videos</h3>
          <div className="video-container">
            {blog.relatedVideos.map((video, index) => (
              <div key={index} className="video-wrapper">
                <a href={video} target="_blank" rel="noopener noreferrer">
                  <img src={`https://img.youtube.com/vi/${extractYouTubeVideoId(video)}/hqdefault.jpg`} alt={`Video ${index + 1}`} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      <p>Author: {blog.author.name}</p>
      <p>Created At: {new Date(blog.createdAt).toLocaleDateString()}</p>
      <p>Last Updated At: {new Date(blog.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

const extractYouTubeVideoId = (videoUrl) => {
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
  const match = videoUrl.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return null;
  }
};

export default BlogDisplay;
