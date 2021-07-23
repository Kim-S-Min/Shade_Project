import axios from "axios";

const API_URL = "http://localhost:8080/api/contents/";

const Like = axios.post(API_URL + {check_like} + "&" + {user_id}, {
    user_id: {user_id},
    contents_id: {contents_id},
    check_like: {check_like}
})

export default Like;