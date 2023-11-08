import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  comment: null,
  isFetching: false,
  error: null,
};

export const CommentContext = createContext(INITIAL_STATE);

const CommentReducer = (state, action) => {
  switch (action.type) {
    case "COMMENT_START":
      return {
        comment: null,
        isFetching: true,
        error: null,
      };
    case "COMMENT_SUCCESS":
      return {
        comment: action.payload,
        isFetching: false,
        error: null,
      };
    case "COMMENT_ERROR":
      return {
        comment: null,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const CommentContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(CommentReducer, INITIAL_STATE);

  useEffect(()=>{
    
  })
}