import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
export default function PrayerImage({Name ,time,img}) {
    return (
        <Card sx={{ maxWidth: 345,minWidth:250 }} style={{ margin: '0 10px' }} >
            <CardMedia
                sx={{ height: 140 }}
                image={ img}
           
                title="green iguana"
            />
            <CardContent>
                <h2 gutterBottom variant="h5" component="div">
                    {Name}
                </h2>
                <Typography variant="h1" sx={{ color: 'text.secondary' }}>
                    {time}
                </Typography>
            </CardContent>
          
        </Card>
    
    
    )


}