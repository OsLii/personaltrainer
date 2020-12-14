import React, {useState, useEffect} from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";



function EventCalendar() {
  
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    getEvents();
  }, []);

  const [events, setEvents] = useState([]);

  if (!events) {
    return "Loading";
  }

  const getEvents = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => {
        let eventArray = [];
        for (let i = 0; i < data.length; i++) {
          eventArray.push({
            title: data[i].activity,
            allday: "false",
            start: new Date(data[i].date),
            end: moment(data[i].date).add(data[i].duration, "minutes").toDate(),
          });
          setEvents(eventArray);
        }
      })

      .catch((err) => console.error(err));
  };

  return (
    <div style={{ height: "700px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        step={60}
        defaultView={"week"}
      ></Calendar>
    </div>
  );
}
export default EventCalendar;