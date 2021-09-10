import React from "react";

const Listeners = ({listeners}) => {
    var listenerTimeMp = new Array(7).fill([])
    for (var i=0; i<7; i++) {
        listenerTimeMp[i] = new Array(24).fill([])
        for (var j=0; j<24; j++) {
            listenerTimeMp[i][j] = new Array(0)
        }
    }
    const allDays = ['周一', '周二', '周三', '周日', '周五']
    var allTimeSlots = Array(24)
    for (var i=0; i<24; i++) {
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
            const idxDay = allDays.indexOf(day)
            const idxTime = allTimeSlots.indexOf(time)
            listenerTimeMp[idxDay][idxTime].push(listener)
        }
    }
    console.log('listenerTimeMp ', listenerTimeMp)

    var timeSlotsInOneWeek = new Array(7).fill([])
    for (var i=0; i<7; i++) {
        timeSlotsInOneWeek[i] = new Array(0)
    }
    for (var d=0; d<7; d++) {
        const listenersInOneDay = listenerTimeMp[d]
        for (var s=0; s<24; s++) {
            const numListenersInOneSlot = listenersInOneDay[s].length
            if (numListenersInOneSlot > 0) {
                const pair = {slot: allTimeSlots[s], dummy: 100}
                timeSlotsInOneWeek[d].push(pair)
            }
        }
    }

    const TimeSlotListsInOneWeek = timeSlotsInOneWeek.map(timeSlotsInOneDay => {
        const TimeSlotListInOneDay = timeSlotsInOneDay.map(timeSlot => {
            console.log(timeSlot)
            return (
                <li className="timeSlot">{timeSlot.slot.slice(0)}</li>
            )
        })
        return (
            <ul className="TimeSlotListInOneDay">
                {TimeSlotListInOneDay}
            </ul>
        )
    }) 
    return (
        <div className="TimeSlotListsInOneWeek">
            {TimeSlotListsInOneWeek}
        </div>
    )
    // const ListenerList = listeners.map(listener => {
    //     return (
    //         <li className="time-slot-item">
    //             {listener.time_slot}
    //         </li>
    //     )
    // })
    // return (
    //     <ul className="time-slot">
    //         {ListenerList}
    //     </ul>
    // )
}


export default Listeners;