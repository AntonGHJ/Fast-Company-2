/*eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById, getProfessionsLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionById(id));
    if (!isLoading) {
        return (
    <div className="card mb-3">
    <div className="card-body d-flex flex-column justify-content-center text-center">
            <h5 className="card-title">
                <p>{prof.name}</p>
            </h5>
        </div>
    </div>);
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
