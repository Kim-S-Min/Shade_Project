import React, {useState, useEffect} from "react";
import Axios from "axios";
import { IconButton } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

// 1. 로그인이 되어있는 유저만 좋아요 싫어요를 클릭할 수 있어야 한다.
// 2. response를 받을 때 해당 (user_id, contents_id, check_like)의 값을 받아야 한다
// 3. 좋아요, 싫어요를 눌렀을때 check_like의 값이 (null, like, unlike)로 변동이 되어야 한다
// 4. 좋아요를 눌렀을때 check_like의 값이 null -> like로 변해야 한다
// 5. 좋아요를 한번 더 눌렀을 때 check_like의 값이 like -> null 로 변해야 한다
// 6. 싫어요를 눌렀을때 check_like의 값이 null -> unlike 로 변해야 한다
// 7. 싫어요를 한번 더 눌렀을 때 check_like의 값이 unlike -> null로 변해야 한다.
// 8. check_like의 값이 like일때 싫어요를 누르면 like -> unlike 로 변해야 한다.
// 9. check_like의 값이 unlike일때 좋아요를 누르면 unlike -> like로 변해야 한다.

export default function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0)
  const [Dislikes, setDislikes] = useState(0)
  const [LikeAction, setLikeAction] = useState(null)
  const [DisLikeAction, setDisLikeAction] = useState(null)
  
  let variable = {};
  
  if (props.contents_id) {
    variable = { contents_id: props.contents_id, user_id: props.user_id };
  }
  
  useEffect(() => {
    Axios.post('/api/like/getLikes', variable).then((response) => {
      if (response.data.success) {
        //얼마나 많은 좋아요를 받았는지
        setLikes(response.data.likes.length);
        //내가 좋아요를 이미 눌렀는지
        response.data.likes.map((like) => {
          if (like.user_id === props.user_id) {
            //pros.userId는 로그인한 사용자의 Id이기때문
            setLikeAction('liked');
          }
        });
      } else {
        alert('Like에 대한 정보를 가져오지 못했습니다.');
      }
    });
    Axios.post('/api/like/getDislikes', variable).then((response) => {
      if (response.data.success) {
        //얼마나 많은 싫어요를 받았는지
        setDislikes(response.data.dislikes.length); 
        //내가 싫어요를 이미 눌렀는지
        response.data.dislikes.map((dislike) => {
          if (dislike.user_id === props.user_id) {
            //pros.userId는 로그인한 사용자의 Id이기때문
            setDisLikeAction('disliked');
          }
        });
      } else {
        alert('DisLike에 대한 정보를 가져오지 못했습니다.');
      }
    });
  }, []);

  const onLike = () => {
    if (LikeAction === '') {
      Axios.post('/api/like/upLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes === "like");
          setLikeAction('liked');
          console.log("like");

          if (DisLikeAction !== '') {
            setDisLikeAction('');
            setDislikes(Dislikes === "unlike");
            console.log("unlike");
          }
        } else {
          alert('Like를 올리지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/unLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes === "null");
          setLikeAction('');
        } else {
          alert('Like를 내리지 못했습니다.');
        }
      });
    }
  };

  const onDislike = () => {
    if (DisLikeAction !== '') {
      Axios.post('/api/like/unDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDisLikeAction('');
        } else {
          alert('dislike를 지우지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/upDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDisLikeAction('disliked');

          if (LikeAction !== '') {
            setLikeAction('');
            setLikes(Likes - 1);
          }
        } else {
          alert('dislike를 올리지 못했습니다.');
        }
      });
    }
  };

  return (
    <div>
      <span key="comment-basic-like">
        <IconButton title="Like">
          {LikeAction === '' ? (
            <ThumbUpIcon color="primary" onClick={onLike} />
            ) : (
            <ThumbUpIcon onClick={onLike} />
          )}
        </IconButton>
        <span style={{ paddingLeft: '4px', cursor: 'auto' }}> {Likes}</span>
      </span>

      <span key="comment-basic-dislike" style={{ marginLeft: '4px' }}>
        <IconButton title="Dislike">
          {DisLikeAction === '' ? (
            <ThumbDownIcon color="secondary" onClick={onDislike} />
          ) : (
            <ThumbDownIcon onClick={onDislike}/>
          )}
        </IconButton>
        <span style={{ paddingLeft: '4px', cursor: 'auto' }}> {Dislikes}</span>
      </span>
    </div>
  );
}


