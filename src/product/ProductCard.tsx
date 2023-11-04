import * as React from 'react';
import {Card,CardContent,  CardActions,CardMedia,Button , Typography} from '@mui/material';
import { IProductProps } from '../pages/products/[slug]';
import { CardActionArea } from '@mui/material';

type IProductCard = {
  product: IProductProps;
};

const ProductCard = (props: IProductCard) =>  (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea href={ '/products/' + props.product.slug}>
          <CardMedia
            component="img"
            height="140"
            image={props.product.image}
            title={props.product.title}
        />
        {props.product.description &&
            <CardContent className='no-decoration'>
              <Typography gutterBottom variant="h5" component="div">
              {props.product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.product.description}
              </Typography>
            </CardContent>
        }
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Agergar al Carrito
          </Button>
          <Button size="small" color="primary">
            Compartir
          </Button>
        </CardActions>
      </Card>

    </>
)

export { ProductCard };
