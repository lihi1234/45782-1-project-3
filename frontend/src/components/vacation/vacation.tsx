import { useNavigate } from 'react-router-dom';
import './vacation.css';
import { useAppDispatcher } from '../../redux/hooks'
import { deleteVacation } from '../../redux/vacation-slice';
import type VacationModel from '../../models/vacation';
import useService from '../../hooks/use-service';
import VacationService from '../../services/auth-aware/VacationService';
import useUserId from '../../hooks/use-user-id';
import LikesService from '../../services/auth-aware/LikesService';
import type Like from "../../models/like";
// import type User from '../../models/user';
import { indicateNewContentAvailable, like } from '../../redux/likes-slice';
import { useEffect, useState } from 'react';


// import useUserRole from '../../hooks/use-user-role';

interface VacationProps {
    vacation: VacationModel,
    isEditAllowed: boolean,
    isNew?: boolean
}

export default function Vacation(props: VacationProps) {

    const {
        id,
        destination,
        description,
        startedAt,
        endedAt,
        price,
        imageUrl,
        likes:initialLikesFromProps
    } = props.vacation;

    const { isEditAllowed, isNew } = props;
    const userId = useUserId();
    

//   console.log(likes)

      const [likes, setLikes] = useState<Like[]>(initialLikesFromProps ?? []);

    // initial values based on props:
    const initialHasLiked = likes?.some(like => like.userId === userId && like.vacationId === id) ?? false;

    // console.log(initialHasLiked)
    const initialLike = likes?.find(like => like.userId === userId && like.vacationId === id) ?? null;
    // console.log(initialLike)
    const [hasLiked, setHasLiked] = useState(initialHasLiked);
    const [currentLike, setCurrentLike] = useState<Like | null>(initialLike);
      const likesCount = likes.length;

    // const [likesCount, setLikesCount] = useState(likes.length ?? 0);

    // const userLikes= props.vacation.userLikes;

    const navigate = useNavigate();

    const dispatch = useAppDispatcher();

    const vacationService = useService(VacationService)
    const likeService = useService(LikesService)

    useEffect(() => {
    setLikes(initialLikesFromProps ?? []);
  }, [initialLikesFromProps]);

    // console.log(props.vacation)
    async function removeMe() {
        try {
            if (confirm('are you sure?')) {
                await vacationService.delete(id);
                dispatch(deleteVacation(id));
            }
        } catch (e) {
            alert(e);
        }
    }

    function editMe() {
        navigate(`/vacations/edit/${id}`);
    }

    async function toggleLike() {
        try {
            if (currentLike) {
                // unlike
                await likeService.remove(currentLike);
                setHasLiked(false);
                setCurrentLike(null);
                        setLikes(prev => prev.filter(l => l !== currentLike));

                // setLikesCount(c => c - 1);
            } else {
           

                const newLike: Like = {
                    userId : userId as string,
                    vacationId: props.vacation.id,
                };

                 await likeService.add(newLike); // assume backend returns like with id
                setLikes(prev => [...prev, newLike]);

                dispatch(like(newLike));

                dispatch(indicateNewContentAvailable());

                setHasLiked(true);
                setCurrentLike(newLike);
                // setLikesCount(c => c + 1);
            }
        } catch (e) {
            alert(e);
        }
    }
 


    const className = `Vacation ${isNew ? 'new-vacation' : ''}`;

    return (
        <div className={className}>
            <div><h3>{destination}</h3></div>
            <div className="likes">
                {!isEditAllowed && <button onClick={toggleLike}>
                    <div>{hasLiked ? "❤️" : "🤍"}</div>

                </button>}

                <span>{likesCount}</span>
            </div>

            <div className="v-dates">
                {(new Date(startedAt)).toLocaleDateString()} ➜ {(new Date(endedAt)).toLocaleDateString()}
            </div>

            <div className="v-description">
                {description}
            </div>

            <div className="v-price">
                ${price}
            </div>

            {imageUrl && <div><img src={imageUrl} /></div>}

            {isEditAllowed && <div>
                <button onClick={removeMe}>Delete</button><button onClick={editMe}>Edit</button>
            </div>}



        </div>
    );
}


