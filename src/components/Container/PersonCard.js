import styles from "../../style/MemberPage.module.scss";
import { ReactComponent as Star } from "../../image/icon/star.svg";
import { dataApi, cancelLiked } from "../../utils";
import { useSelector } from "react-redux";

export default function PersonCard(props) {
  const userLike = useSelector((state) => state.userLike);

  function getPersonData() {
    Promise.all([
      dataApi("tmdb", "person", "/movie_credits", props.data.person_id),
      dataApi("tmdb", "person", "", props.data.person_id),
    ])
      .then((arr) => {
        props.setPersonData({
          crew: arr[0],
          person: arr[1],
        });
      })
      .then(() => {
        if (props.personData !== {}) {
          props.setCrewOpen(true);
          props.setCrewLoading(true);
        }
      });
  }

  return (
    <div className={styles.personCard}>
      <div className={styles.posterBox} onClick={getPersonData}>
        <img
          alt="poster"
          src={`https://image.tmdb.org/t/p/w185${props.data.profile_path}`}
        />
        <Star
          onClick={(e) =>
            cancelLiked(
              e,
              userLike.personList,
              "person_liked",
              props.data.person_id
            )
          }
        />
      </div>
      <div className={styles.basicInfo}>
        <div>{props.data.person_name}</div>
        <div>{props.data.person_name_ch}</div>
      </div>
    </div>
  );
}
