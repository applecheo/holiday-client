import urlcat from "urlcat";
import { useEffect, useState } from "react";
import { SERVER } from "../utils/constants";

function HolidayTable() {
  const [holidays, setHolidays] = useState([]);
  // const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchHolidays = async () => {
      const url = urlcat(SERVER, "/holidays");
      const request = await fetch(url);
      const data = await request.json();
      setHolidays(data);
    };
    fetchHolidays();
  }, []);

  const handleDelete = (id) => async () => {
    console.log(`Deleting ${id}`);
    const url = urlcat(SERVER, `/holidays/${id}`);
    const res = await fetch(url, { method: "DELETE" });
    const data = await res.json();
    console.log("data %o", data);
    // setReload(!reload);
    setHolidays(holidays.filter((holiday) => holiday._id !== id));
  };

  return (
    <table>
      <caption>Holidays</caption>
      <thead>
        <tr>
          <th>Title</th>
          <th>Likes</th>
        </tr>
      </thead>
      <tbody>
        {holidays.map((holiday) => (
          <tr key={holiday._id}>
            <td>{holiday.title}</td>

            <td>{holiday.likes}</td>
            <td>
              <button>+1</button>
              <button>Edit</button>
              <button onClick={handleDelete(holiday._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HolidayTable;
