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
    <Card
    onClick={handleClick}
    sx={{
      '&:hover': {
        transform: 'scale(1.05)', 
        cursor:'pointer' 
      },
      height:'350px'
     
    }}
  >
   
      <CardMedia
        component="img"
        alt="green iguana"
        objectFit="contain"
        image={require(`../../icons/${value.img}`)}
        sx={{
          height:'60%'
        }}
      />
      <CardContent
        >
        <Typography
          sx={{
            padding: '10px',
            color: 'gray',
            textAlign: 'center',
            fontWeight: 'bold', 
            fontSize: '1rem',
          }}
        >
          Login As {value.type}
        </Typography>
      </CardContent>
  </Card>
  
  )
}

export default CardType
