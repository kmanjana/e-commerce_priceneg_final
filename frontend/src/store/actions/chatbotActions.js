import Axios from "axios";

export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const UPDATE_USER_MESSAGE = "UPDATE_USER_MESSAGE";
export const COUNTER_OFFER = "COUNTER_OFFER";
export const NEGOTIATE = "NEGOTIATE";
export const END_NEG = "END_NEG";
export const USEROFFER_LESS = "USEROFFER_LESS";
export const USEROFFER_GREATER = "USEROFFER_GREATER";
export const USER_NO = "USER_NO";

export const textQueryAction = (data) =>{ 
    return async dispatch => {
            dispatch({ type: UPDATE_USER_MESSAGE, data: data })
            if(data.command == 'other'){
                const responses = await Axios.post("http://localhost:3002/chat_in",{
                    command:data.command,
                    text:data.text,
                    userName: "athu123"
                    })
                // console.log("response",responses.data)
                return dispatch({ type: UPDATE_MESSAGE, data: responses.data })
            } 
            else if(data.command == 'useroffer_lessthan_minprice'){
                const responses = await Axios.post("http://localhost:3002/chat_in",{
                    command:data.command,
                    text:data.text,
                    userName: "athu123"
                    })
                // console.log("response",responses.data)
                return dispatch({ type: UPDATE_MESSAGE, data: responses.data })
            } 
            // if(data.command == 'useroffer_lessthan_minprice'){
                
            //     return dispatch({ type: USEROFFER_LESS, data })
            // } 
            else if(data.command == 'useroffer_greaterthan_maxprice'){
                
                return dispatch({ type: USEROFFER_GREATER, data })
            } 
            else if(data.command == 'counteroffer'){
                // console.log("data is " + data.useroffer)
                const responses = await Axios.post("http://localhost:3002/chat_in",{
                    command:data.command,
                    text:data.text,
                    useroffer:data.useroffer,
                    maxprice: data.maxprice,
                    minprice: data.minprice,
                    round : data.round,
                    userName: "athu123"
                    })
                // console.log("response counter is ",responses.data.counter_offer)
                return dispatch({ type: COUNTER_OFFER, data: responses.data })
            }
            else if(data.command == '###nego'){
                const responses = await Axios.post("http://localhost:3002/chat_in",{
                    command: data.command,
                    pid: data.pid
                    })
                    // console.log(responses.data)
                    return dispatch({ type: NEGOTIATE, data: responses.data[0] }) 
            }
            else if (data.command == "end"){
                console.log("end")
                if(data.text == 'no'){
                    return dispatch({ type: USER_NO, data })

                }
                else{
                    const responses = await Axios.post("http://localhost:3002/chat_in",{
                        command:"end",
                        text:data.text,
                        userName: "athu123"
                        })
                        // console.log("data.round " +data.round)
                    return dispatch({type:END_NEG,data: responses.data,round:data.round})
                }
                
            }
            
        
        
    }
}