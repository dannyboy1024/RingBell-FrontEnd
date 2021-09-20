import React from "react";

const TimeSlots = ({listeners,allDays,handleTimeSlotClick}) => {
    const dayMp = new Map([
        ["Sunday", '周日'],
        ["Monday", '周一'],
        ["Tuesday", '周二'],
        ["Wednesday", '周三'],
        ["Thursday", '周四'],
        ["Friday", '周五'],
        ["Saturday", '周六']
      ]);
    var days = Array(7)
    for (var i=0; i<7; i++) {
        days[i] = dayMp.get(allDays[i])
    }
    
    // declare 3d listenerTimeMp
    var listenerTimeMp = new Array(7).fill([])
    for (i=0; i<7; i++) {
        listenerTimeMp[i] = new Array(24).fill([])
        for (var j=0; j<24; j++) {
            listenerTimeMp[i][j] = new Array(0)
        }
    }

    var allTimeSlots = Array(24)
    for (i=0; i<24; i++) {
        var start = i
        var end = (i+1)%24
        const suffix = end<12 ? 'am' : 'pm'
        start -= start>12 ? 12 : 0
        end -= end>12 ? 12 : 0
        allTimeSlots[i] = start.toString()+':00-'+end.toString()+':00'+suffix
    }
    
    // organize the listeners
    for (const listener of listeners) {
        for (const slot of listener.time_slot) {
            const day = slot.slice(0,2)
            const time = slot.slice(3)
            const idxDay = days.indexOf(day)
            const idxTime = allTimeSlots.indexOf(time)
            listenerTimeMp[idxDay][idxTime].push(listener)
        }
    }
    console.log('listenerTimeMp ', listenerTimeMp)

    var timeSlotsInOneWeek = new Array(7).fill([])
    for (i=0; i<7; i++) {
        timeSlotsInOneWeek[i] = new Array(0)
    }
    for (var d=0; d<7; d++) {
        const listenersInOneDay = listenerTimeMp[d]
        for (var s=0; s<24; s++) {
            const numListenersInOneSlot = listenersInOneDay[s].length
            if (numListenersInOneSlot > 0) {
                timeSlotsInOneWeek[d].push({slot : allTimeSlots[s], id : d*24+s})
            }
        }
    }

    const TimeSlotListsInOneWeek = timeSlotsInOneWeek.map(timeSlotsInOneDay => {
        const TimeSlotListInOneDay = timeSlotsInOneDay.map(timeSlot => {
            return (
                // <li className="timeSlot">{timeSlot.slice(0)}</li>
                <button className="timeSlot" id={timeSlot.id} key={timeSlot.id} onClick={handleTimeSlotClick}>{timeSlot.slot.slice(0)}</button>
            )
        })
        return (
            <ul style={{ listStyleType: "none" }} className="TimeSlotListInOneDay" key={timeSlotsInOneWeek.indexOf(timeSlotsInOneDay)}>
                {TimeSlotListInOneDay}
            </ul>
        )
    }) 
    return (
        <div className="TimeSlotListsInOneWeek">
            {TimeSlotListsInOneWeek}
        </div>
    )
}


export default TimeSlots;