

export function TrafficMessage(RouteInfo){
    const [travelTimeInSeconds, trafficDelaysInSeconds] = RouteInfo
    const travelHour = Math.floor(travelTimeInSeconds / 3600);
    const travelMinutes = Math.floor((travelTimeInSeconds % 3600) / 60);
    const trafficHour = Math.floor(trafficDelaysInSeconds / 3600);
    const trafficMin = Math.floor((trafficDelaysInSeconds % 3600) / 60);

    

   let sendMessage = 'Time to arrive is '

   if(travelHour > 0) sendMessage += `${travelHour} hour${travelHour > 1 ? 's ' : ' '}`
   if(travelMinutes > 0) sendMessage += `${travelMinutes} minutes`

   if(trafficHour > 0 && trafficMin > 0){
    sendMessage += ` with a ${trafficHour} hour${trafficHour > 1 ? 's' : ''} ${trafficMin} minutes delay`
   }
   else if(trafficHour > 0 && trafficMin === 0){
    sendMessage += ` with a ${trafficHour} hour${trafficHour > 1 ? 's' : ''} delay`
   }
   else if (trafficMin > 0){ sendMessage += ` with a ${trafficMin} minute delay`
    
   } 
   


return sendMessage;
    
}