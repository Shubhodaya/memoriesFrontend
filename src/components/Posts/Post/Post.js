
import React, {useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button,ButtonBase, Typography } from '@material-ui/core/';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const Post = ({post,setCurrentId})=>{

    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const [likes,setLikes]= useState(post?.likes);

    const userId= user?.result?.sub || user?.result?._id ;
    const hasLikedPost =  post.likes.find((like) => like === userId);

    const handleLike =() =>{

      dispatch(likePost(post._id));
      
      if(hasLikedPost){
     setLikes(post.likes.filter((id) => id !==userId))
      }else{
        setLikes([...post.likes,userId])
      }
     
    }

    const Likes = () => {
      if (likes.length > 0) {
        return likes.find((like) => like === userId)
          ? (
            <><FavoriteIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><FavoriteBorderOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
          );
      }
  
      return <><FavoriteBorderOutlinedIcon  fontSize="small" />&nbsp;Like</>;
    };
    
    const openPost =() => history.push(`/posts/${post._id}`);

    return (
<Card className={classes.card} raised elevation={6}>
 
<ButtonBase className={classes.cardAction} onClick={openPost}>

<CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
  
        </ButtonBase>
         <div className={classes.details}>
       <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
       {(user?.result?.sub ===post?.creator || user?.result?._id=== post?.creator  ) &&(
        <div className={classes.overlay2}>
       <Button style={{ color: 'black' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="medium" /></Button>
     </div>
        )}
     </div>
     <ButtonBase className={classes.cardAction} onClick={openPost}>
     <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title.substring(0, 30)}</Typography>
     <CardContent>
       <Typography variant="body2" color="textSecondary" component="p">{`${post.message.substring(0, 150)}...`}</Typography>
     </CardContent>
     </ButtonBase>

     <CardActions className={classes.cardActions}>
       <Button size="small" color="secondary" disabled={!user?.result} onClick={handleLike}> 
       <Likes/>
       </Button>
       {(user?.result?.sub ===post?.creator || user?.result?._id=== post?.creator  ) &&(
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>

       )}
       
     </CardActions>
   </Card>

    )
}


export default Post;

/* <ButtonBase className={classes.cardAction} onClick={openPost}></ButtonBase> */  
