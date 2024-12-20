import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const StyledWrapper = styled.div`
  section.card {
    position: relative;
    width: auto;
    height: 200px;
    background-color: gray;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    perspective: 1000px;
    transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
  }

  .card__image {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    object-fit: cover;
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px #000000;
    background-color: #gray;
    color: #ffffff;
  }

  .card__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: gray;
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover .card__content {
    transform: rotateX(0deg);
  }

  .card__title {
    margin: 0;
    padding-left: 5px;
    font-size: 24px;
    color: var(--white);
    font-weight: 700;
  }

  .card:hover .card__image {
    scale: 0;
  }

  .card__description {
    margin: 10px 0 0;
    font-size: 14px;
    color: #ffffff;
    line-height: 1.4;
  }
`;
const CustomCard= ({data}) => {
  const navigate = useNavigate();
  const handleConferenceClick = () => {
    
    navigate(`${data.to}`);
  }
  return(
    <StyledWrapper
    onClick={handleConferenceClick}
    >
    <section id="card1" className="card">
      <img
        src={data.image}
        alt="Card Placeholder"
        className="card__image"
      />
      <div className="card__content">
        <p className="card__title">{data.title}</p>
        <p className="card__description">
          {data.description}
        </p>
      </div>
    </section>
  </StyledWrapper>


  );
 
  

  

  
};

export default CustomCard;
