import { UPDATE_MESSAGE, UPDATE_USER_MESSAGE, COUNTER_OFFER,NEGOTIATE, END_NEG,USEROFFER_LESS,USEROFFER_GREATER,USER_NO } from "../actions/chatbotActions";

const initialState ={
     messages : []
}

const chatbotReducer = (state = initialState, action) =>{
    switch (action.type) {
        case UPDATE_MESSAGE:    //action=> type, data {response, intent_name,parameter = nutraj}
            // console.log("reply",action.data.response)
            let message = {
                speak: "bot",
                text: action.data.response,
                intent: action.data.intent_name,
                item: action.data.parameter,
                counter: "no"
            }
            return {
                ...state, messages : [...state.messages, message]
            };
            case USEROFFER_LESS:    //action=> type, data {response, intent_name,parameter = nutraj}
            // console.log("reply",action.data.response)
            let message2 = {
                speak: "bot",
                command:action.data.command
            }
            return {
                ...state, messages : [...state.messages, message2]
            };
            case USEROFFER_GREATER:    //action=> type, data {response, intent_name,parameter = nutraj}
            // console.log("reply",action.data.response)
            let message3 = {
                speak: "bot",
                command:action.data.command
            }
            return {
                ...state, messages : [...state.messages, message3]
            };
        case UPDATE_USER_MESSAGE:    //action=> type, data {text = nutraj}
            // console.log("inreducer",action.data)
            let messageUser = {
                speak: "user",
                text: action.data.text
            } 
            return {
                ...state, messages : [...state.messages, messageUser]
            };
        case COUNTER_OFFER:    //action=> type, data {counter_offer}
            // console.log("reply",action.data.user_offer)
            let msg = {
                speak: "bot",
                text: action.data.counter_offer.toFixed(2),
                useroffer: action.data.user_offer,
                round: action.data.round,
                minprice : action.data.min_price,
                maxprice: action.data.max_price,
                counter: "yes"
            }
            return {
                ...state, messages : [...state.messages, msg]
            };
        case NEGOTIATE:
                // console.log("inreducer",action.data)
                let messageNego = {
                    speak: "nego",
                    p_name: action.data.p_name,
                    pid: action.data.pid,
                    img: action.data.img,
                    price: action.data.price,
                    brand: action.data.brand,
                    shop_name: action.data.shop_name
                }
                return {
                    ...state, messages : [...state.messages, messageNego]
                };  
        case END_NEG:
            console.log(action.data.response)
            let endNego = {
                speak: "bot",
                text: action.data.response,
                intent: action.data.intent_name,
                item: action.data.parameter,
                counter: "no",
                endneg: "yes",
                round: action.round
            } 
                return {
                    ...state, messages : [...state.messages, endNego]
                }; 
                case USER_NO:
                    console.log(action.data.response)
                    let userno = {
                        speak: "no",
                        text: action.data.text
                    } 
                        return {
                            ...state, messages : [...state.messages, userno]
                        }; 
        default:
            return state;
    }
}

export default chatbotReducer