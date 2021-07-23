import Axios from "axios";

const BOARD_API_BASE_URL = "http://localhost:8080/api/like/";

const Dislike = (user_id, contents_id, check_like) => {
    return Axios.get(BOARD_API_BASE_URL + "like", {
        user_id,
        contents_id,
        check_like
    });
};

export default {
    Dislike
}