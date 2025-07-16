import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = ({ image, title, tech, tags = [], projectLink, shadow }) => {
  // Set image height for all cards to 170px for consistency
  const imageHeight = 170;
  const isMiznetOrBlockchain = title === 'Miznet' || title === 'AI - Integrated Blockchain';
  const objectFit = isMiznetOrBlockchain ? 'contain' : 'cover';

  // Use router to navigate to /works on click
  const router = require('next/router').useRouter ? require('next/router').useRouter() : undefined;
  const handleCardClick = (e) => {
    e.preventDefault();
    if (router) router.push('/works');
  };

  return (
    <StyledWrapper $shadow={shadow} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <article className="article-wrapper">
        <div className="rounded-lg container-project" style={{ height: imageHeight, background: '#fff' }}>
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit, borderRadius: '10px', background: '#fff' }}
              sizes="250px"
              priority={false}
            />
          )}
        </div>
        <div className="project-info">
          <div className="flex-pr">
            <div className="project-title text-nowrap">{title}</div>
            <div className="project-hover">
              <svg style={{color: 'black'}} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" color="black" strokeLinejoin="round" strokeLinecap="round" viewBox="0 0 24 24" strokeWidth={2} fill="none" stroke="currentColor"><line y2={12} x2={19} y1={12} x1={5} /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </div>
          <div className="types">
            {tags.length > 0 ? (
              tags.map((tag, idx) => (
                <span
                  key={tag}
                  style={idx === 0 ? {backgroundColor: 'rgba(165, 96, 247, 0.43)', color: 'rgb(85, 27, 177)'} : {}}
                  className="project-type"
                >
                  • {tag}
                </span>
              ))
            ) : (
              <span className="project-type">• {tech}</span>
            )}
          </div>
        </div>
      </article>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .article-wrapper {
    width: 250px;
    -webkit-transition: 0.15s all ease-in-out;
    transition: 0.15s all ease-in-out;
    border-radius: 10px;
    padding: 5px;
    border: 4px solid transparent;
    cursor: pointer;
    background-color: white;
    ${props => props.$shadow ? 'box-shadow: 0 8px 32px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.06);' : ''}
  }

  .article-wrapper:hover {
    -webkit-box-shadow: 10px 10px 0 #4e84ff, 20px 20px 0 #4444bd;
    box-shadow: 10px 10px 0 #4e84ff, 20px 20px 0 #4444bd;
    border-color: #0578c5;
    -webkit-transform: translate(-20px, -20px);
    -ms-transform: translate(-20px, -20px);
    transform: translate(-20px, -20px);
  }

  .article-wrapper:active {
    -webkit-box-shadow: none;
    box-shadow: none;
    -webkit-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
  }

  .types {
    gap: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    place-content: flex-start;
  }

  .rounded-lg {
   /* class tailwind */
    border-radius: 10px;
    position: relative;
    width: 100%;
    height: 170px;
    overflow: hidden;
    background: #e5e7eb;
  }

  .article-wrapper:hover .project-hover {
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    background-color: #a6c2f0;
  }

  .project-info {
    padding-top: 20px;
    padding: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    gap: 20px;
  }

  .project-title {
    font-size: 1.2em;
    margin: 0;
    font-weight: 600;
    /* Remove ellipsis and allow wrapping */
    overflow: visible;
    text-overflow: unset;
    white-space: normal;
    color: black;
    word-break: break-word;
  }

  .flex-pr {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .project-type {
    background: #b2b2fd;
    color: #1a41cd;
    font-weight: bold;
    padding: 0.3em 0.7em;
    border-radius: 15px;
    font-size: 12px;
    letter-spacing: -0.6px
  }

  .project-hover {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    padding: 9px;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container-project {
    width: 100%;
    height: 170px;
    background: gray;
    position: relative;
  }
  .project-info {
    font-size: 1em;
  }
  @media (max-width: 768px) {
    .article-wrapper {
      width: 95vw;
      max-width: 350px;
      min-width: 220px;
      padding: 8px;
    }
    .project-title {
      font-size: 1.15em;
      line-height: 1.2;
    }
    .project-type {
      font-size: 12px;
      padding: 0.3em 0.7em;
    }
    .project-info {
      font-size: 1em;
    }
  }
`;

export default ProjectCard; 