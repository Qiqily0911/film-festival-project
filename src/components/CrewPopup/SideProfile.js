import styles from "../../style/Crew.module.scss";
import { addLiked, cancelLiked } from "../../utils";
import { ReactComponent as Star } from "../../image/icon/star.svg";
import { ReactComponent as Imdb } from "../../image/IMDB_Logo.svg";
import { useSelector } from "react-redux";

export default function SideProfile(props) {
  const userLike = useSelector((state) => state.userLike);

  return (
    <div className={styles.profile}>
      <div className={styles.photo}>
        <div>
          {props.personData.profile_path ? (
            <img
              alt="profile"
              src={`https://image.tmdb.org/t/p/w154${props.personData.profile_path}`}
            />
          ) : (
            <div className={styles.noprofile}>
              <p>No Photo</p>
            </div>
          )}

          <div className={styles.likeBtn}>
            {userLike.user.uid && (
              <Star
                className={props.isLiked ? styles.addBtn : styles.cancelBtn}
                onClick={(e) =>
                  props.isLiked
                    ? cancelLiked(
                        e,
                        userLike.personList,
                        "person_liked",
                        props.personData.id
                      )
                    : addLiked(e, "person_liked", props.obj)
                }
              />
            )}
          </div>
        </div>
      </div>
      <span className={styles.name}>{props.personData.name}</span>
      {props.personNameCh}

      <div className={styles.below}>
        {props.personData.birthday}
        <a
          href={`https://www.imdb.com/name/${props.personData.imdb_id}/`}
          target="_blank"
          rel="noreferrer"
        >
          <Imdb />
        </a>
      </div>

      <div className={styles.biography}>
        <p>{props.personData.biography}</p>
      </div>
    </div>
  );
}
