import { useEffect, useState } from "react";
import urlcat from "urlcat";
import PropTypes from "prop-types";
import { SERVER } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import CountriesSelect from "../components/CountriesSelect";

const parseJwt = (token) => {
  if (token === "") {
    return {};
  }

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
};

function CreateHolidayForm({ token }) {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (parseJwt(token).name !== "simon") {
      navigate("/login");
    }
  }, [token]);

  // useEffect(() => {
  //   const url = urlcat(SERVER, "/verify");
  //   fetch(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => log(data));
  // }, []);

  const handleCreate = (event) => {
    event.preventDefault();
    const elements = event.target.elements;

    const holiday = {
      title: elements.title.value,
      likes: elements.likes.valueAsNumber,
      active: elements.active.checked,
      celebrated: elements.countries.value,
    };
    console.log("holiday %o", holiday);

    const url = urlcat(SERVER, "/holidays");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(holiday),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("result %o", data);
        if (data.msg === "Too many") {
          setStatus("Too many");
        } else {
          setStatus("OK");
        }
      });
  };

  return (
    <form onSubmit={handleCreate}>
      <fieldset>
        <legend>Holiday</legend>
        <label>
          Title: <input name="title" defaultValue="National Day" />
        </label>
        <br />
        <label>
          Likes: <input name="likes" type="number" defaultValue={10} />
        </label>
        <br />
        <label>
          Active: <input name="active" type="checkbox" />
        </label>
        <br />
        <label>
          Countries:
          <CountriesSelect name="countries" />
        </label>
      </fieldset>
      <button>Create</button>
      <span>{status} </span>
    </form>
  );
}

CreateHolidayForm.propTypes = {
  token: PropTypes.string,
};
export default CreateHolidayForm;
