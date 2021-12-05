import React from "react";
import moment from 'moment';

const Days = ({allDays}) => {
    const DayList = allDays.map(day => {
        const off = allDays.indexOf(day)
        const date = moment().add(off,'days').format('L').slice(3,5)
        return (
            <li className="date-slot-wrapper">
                <div className="date-slot-item">
                    <span className="date-slot-day">{day.slice(0,3)}</span>
                    <span className="date-slot-date">{date}</span>
                </div>
            </li>
        )
    })
    return (
        <div className="row time-picker-header">
            <ul className="date-slot">
                {DayList}
            </ul>
       </div>
    ) 
}

export default Days;
