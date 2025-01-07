import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCarts() {
      try {
        const response = await fetch("http://localhost:5132/api/Cart");
        const data = await response.json();
        console.log(data);
        setCartItems(data); // Assuming `data` is an array of cart items
      } catch (error) {
        console.error("Error fetching Cart:", error);
      }
    }

    fetchCarts();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
      {cartItems.map((item) => (
        <Card key={item.id} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt={item.productName}
            height="140"
            image={item.imageUrl || '/static/images/cards/contemplative-reptile.jpg'} // Replace with actual image URL from the API
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.productName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Price: ${item.price}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Quantity: {item.quantity}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleRemove(item.id)}>Remove</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );

  function handleRemove(id) {
    // Logic to handle item removal (e.g., API call to delete the item)
    console.log(`Remove item with id: ${id}`);
    setCartItems(cartItems.filter((item) => item.id !== id));
  }
}
