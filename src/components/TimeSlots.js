import React from "react";

const TimeSlots = ({timeSlots,allDays,dayOff,handleTimeSlotClick}) => {
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
    
    // declare 2d listenerTimeMp
    var listenerTimeMp = new Array(7).fill([])
    for (i=0; i<7; i++) {
        listenerTimeMp[i] = new Array(24)
        for (var j=0; j<24; j++) {
            listenerTimeMp[i][j] = 0
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
    for (const timeSlot of timeSlots) {
        const slotID = timeSlot.timeID
        const idxDay = Math.floor(slotID/24)
        const idxTime = slotID%24
        listenerTimeMp[idxDay][idxTime] = 1
    }

    var timeSlotsInOneWeek = new Array(7).fill([])
    for (i=0; i<7; i++) {
        timeSlotsInOneWeek[i] = new Array(0)
    }
    for (i=0; i<7; i++) {
        const d = (i+dayOff)%7
        const listenersInOneDay = listenerTimeMp[d]
        for (var s=0; s<24; s++) {
            const isAvail = listenersInOneDay[s]
            if (isAvail === 1) {
                timeSlotsInOneWeek[i].push({slot : allTimeSlots[s], id : d*24+s})
            }
        }
    }

    const TimeSlotListsInOneWeek = timeSlotsInOneWeek.map(timeSlotsInOneDay => {
        const TimeSlotListInOneDay = timeSlotsInOneDay.map(timeSlot => {
            return (
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