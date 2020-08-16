// import { SAVE_RSS_ITEM, DELETE_RSS_ITEM } from './../../actionTypes'
// import { IRssList, IRssItem, ActionTypes } from './types'

// const initialState: IRssList = require('./rss.json')
const initialState = {};

// TEMP
interface ActionTypes {
    type: string
}

export default function rssReducer (state = initialState, action: ActionTypes) {
  switch (action.type) {
    
    // case SAVE_RSS_ITEM:
    //   const rssItem = action.payload as IRssItem;

    //   if ( rssItem.id ) {
    //     return state.map( item => item.id == rssItem.id ? rssItem : item )
    //   } else {
    //     return [...state, {...rssItem, id: Date.now()}]
    //   }

    // case DELETE_RSS_ITEM:
    //   const deleteId = action.payload as string;
    //   return state.filter( item => item.id != deleteId )
        
    default:
      return state;
  }
}
