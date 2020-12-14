import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Customerlist from './Customerlist.js';
import Calendar from './Calendar.js';
import Traininglist from './Traininglist.js';

function TabApp() {
    const [value, setValue] = useState("Customers");

    const handleChange = (event, value) => {
        setValue(value);
    };
    return (
        <div>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab value="Customers" label="Customers" />
                    <Tab value="Trainings" label="Trainings" />
                    <Tab value="Calendar" label="Calendar" />
                </Tabs>
            </AppBar>
            {value === "Customers" && (
                <div>
                    <Customerlist/>
                </div>
            )}
            {value === "Trainings" && (
                <div>
                    <Traininglist />
                </div>
            )}
            {value === "Calendar" && (
                <div>
                    <Calendar />
                </div>
            )}
        </div>
    );
}

export default TabApp;