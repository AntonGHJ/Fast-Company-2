import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserEditPage = () => {
      
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "",
    qualities: []
  });
  const { userId } = useParams();
  const history = useHistory();
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
          label: data[professionName].name,
          value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });

    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
          value: data[optionName]._id,
          label: data[optionName].name,
          color: data[optionName].color
      }));
      setQualities(qualitiesList);
  });
  }, []);

  const getProfessionById = (id) => {
    for (const prof of professions) {
        if (prof.value === id) {
            return { _id: prof.value, name: prof.label };
        }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
        for (const quality in qualities) {
            if (elem.value === qualities[quality].value) {
                qualitiesArray.push({
                    _id: qualities[quality].value,
                    name: qualities[quality].label,
                    color: qualities[quality].color
                });
            }
        }
    }
    return qualitiesArray;
  };

  useEffect(() => {
    validate();
  }, [data]);

   const validatorConfig = {
    name: {
      isRequired: {
        message: "необходимо указать имя"
      }
    },
    email: {
      isRequired: {
          message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
          message: "Email введен некорректно"
      }
    },
    qualities: {
      isSelect: {
        message: "Необходимо указать качества"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    api.users.update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities),
      })
      .then((data) => history.push(`/users/${data._id}`));
    console.log({
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities),
    });
  };
  
useEffect(() => {    
    api.users.getById(userId).then(({ profession, qualities, ...data }) =>
        setData((prevState) => ({
            ...prevState,
            ...data,
            qualities: qualities,
            profession: profession._id
        }))
    );
}, []);

  return ( professions &&
    <div className="container mt-5">
        <div className="row">
            <div className='col-md-6 offset-md-3 shadow p-4'>
                <form action="" onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label="Электронная почта"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <SelectField
                        label="Выберите вашу профессию"
                        value={data.profession}
                        onChange={handleChange}
                        options={professions}
                        name="profession"
                        />
                        <RadioField
                        options={[
                            { name: "Мужской", value: "male" },
                            { name: "Женский", value: "female" }
                        ]}
                        value={data.sex}
                        name="sex"
                        onChange={handleChange}
                        label="Выберите ваш пол"
                        />
                        <MultiSelectField
                        options={qualities}
                        onChange={handleChange}
                        name="qualities"
                        label="Выберите ваши качества"
                        error={errors.qualities}
                        />
                        <button className="btn btn-primary"
                        type="submit" 
                        disabled={!isValid}>
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default UserEditPage;
