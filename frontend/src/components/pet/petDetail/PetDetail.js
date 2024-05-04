import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getPet } from "../../../redux/features/Pets/petsSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./PetDetail.scss";
import DOMPurify from "dompurify";

const PetDetail = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
    const { id } = useParams();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { pet, isLoading, isError, message } = useSelector((state) => state.pet);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getPet(id));
        }
    }, [isLoggedIn, id, dispatch]);

    return (
        <div className="pet-detail">
            <h3 className="--mt">Pet Detail</h3>
            <Card cardClass="card">
                {isLoading && <SpinnerImg />}
                {isError && <p>Error: {message}</p>}
                {pet && (
                    <div className="detail">
                        <Card cardClass="group">
                            {pet?.image ? (
                                <img src={pet.image.filePath} alt={pet.image.fileName} />
                            ) : (
                                <p>No image set for this Pet</p>
                            )}
                        </Card>
                        <hr />

                           <p>
                            <b>&rarr; Name: </b> {pet.name}
                            </p>

                            <p>
                            <b>&rarr; Category: </b> {pet.category}
                            </p>

                            <p>
                            <b>&rarr; Price: </b> {pet.price}
                            </p>


                        <hr />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(pet.description),
                            }}
                        ></div>
                        <hr />
                        <code className="--color-dark">
                            Created on: {pet.createdAt ? new Date(pet.createdAt).toLocaleString("en-US") : "Not available"}
                        </code>
                        <br />
                        <code className="--color-dark">
                            Last Updated: {pet.updatedAt ? new Date(pet.updatedAt).toLocaleString("en-US") : "Not available"}
                        </code>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default PetDetail;
