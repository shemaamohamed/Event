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
    sx={{
      '&:hover': {
        transform: 'scale(1.05)',  
      },
      height:'400px'
     
    }}
  >
    <CardActionArea onClick={handleClick}>
      <CardMedia
        component="img"
        alt="green iguana"
        image={require(`../../icons/${value.img}`)}
      />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
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
    </CardActionArea>
  </Card>
  
  )
}

export default CardType
