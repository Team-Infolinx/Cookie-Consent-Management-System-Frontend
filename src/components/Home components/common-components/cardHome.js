import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CardHome = (props) => {
    
    
    return ( 
    <div className="card">
    <Card raised={true} sx={{ maxWidth: 300,minWidth:300, height:400,boxShadow: "4px 4px 20px 4px rgba(0, 0, 0, 0.25)" }}>
        <CardMedia
            sx={{ height: 250, backgroundSize:"fit" }}
            image={props.img}
            title="consent features"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {props.V1}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {props.V2}
            </Typography>
        </CardContent>

    </Card>

    </div>);
}
 
export default CardHome;
