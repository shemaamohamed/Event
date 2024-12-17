import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom";



function CardType({value  ,handleNavigate}) {
    const navigate =useNavigate();
    const handleClick = () => {
        if(value.link==='other'){
            navigate('/other');
        }else{
            handleNavigate(value.link); 
        }
      };

  return (
    <Card sx={{
        '&:hover': {
      transform: 'scale(1.05)',  
    },
    marginTop:'20px',


        
    }} > 
    <CardActionArea onClick={handleClick}>
      <CardMedia
        component="img"
        height="250"
        alt="green iguana"
        
        image={require(`../../icons/${value.img}`)}
       
        
      />
      <CardContent>
        <Typography 
        sx={{
                   
            padding:'10px',
            color: " gray",
            textAlign:'center',
            fontStyle:'bold',
            fontSize:'1rem'
          }} 
          height={50}  >
          Login As {value.type}
        </Typography>
        
      </CardContent>
    </CardActionArea>
  </Card>
  )
}

export default CardType
