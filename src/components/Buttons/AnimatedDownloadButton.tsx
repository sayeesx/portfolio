import styled from "styled-components"

const Button = () => {
  return (
    <StyledWrapper>
      <a href="#" className="btn-shine">
        Download my cv
      </a>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .btn-shine {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 12px 48px;
    color: #fff;
    background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #868686 20%);
    background-size: 200px 100%;
    background-position: 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 3s infinite linear;
    animation-fill-mode: forwards;
    -webkit-text-size-adjust: none;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    white-space: nowrap;
    font-family: "Poppins", sans-serif;
  }

  @-moz-keyframes shine {
    0% {
      background-position: -200px;
    }
    60% {
      background-position: 200px;
    }
    100% {
      background-position: 200px;
    }
  }

  @-webkit-keyframes shine {
    0% {
      background-position: -200px;
    }
    60% {
      background-position: 200px;
    }
    100% {
      background-position: 200px;
    }
  }

  @-o-keyframes shine {
    0% {
      background-position: -200px;
    }
    60% {
      background-position: 200px;
    }
    100% {
      background-position: 200px;
    }
  }

  @keyframes shine {
    0% {
      background-position: -200px;
    }
    60% {
      background-position: 200px;
    }
    100% {
      background-position: 200px;
    }
  }
`

export default Button
