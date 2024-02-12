
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";
import { Layout } from 'react-grid-layout';


const initialState: StaticPageSliceState = {
    dataSource: [
        { i: '1', type:'hidden_' },
        // { i: '4', type:'hidden_' },
        { i: '4', type:'text:static',data:'static is' },
    ],
    layouts: [
        { i: '1', x: 0, y: 0, w: 2, h: 2 },
        { i: '4', x: 2, y: 0, w: 2, h: 2 },
        // Rest of your layouts...
    ],
    status: 'idle',
}

export const staticPageSlice = createSlice({
    name: 'staticPageBuilder',
    initialState,
    reducers: {
        handleChangeLayout: (state, action: PayloadAction<Layout>) => {
            state.layouts = state.layouts.map(layout =>
                layout.i === action.payload.i ? action.payload : layout
            );
        },
        createHiddenLayer: (state, { payload: { h, w, x, y } }: PayloadAction<{ h?: number, w?: number, x?: number, y?: number }>) => {
            const new_I = uuidv4();
            state.layouts.push({
                h: h || 1,
                w: w || 1,
                x: x || 0,
                y: y || 0,
                i: new_I,
            });
            state.dataSource.push({
                i: new_I,
                type:'hidden_'
            });
        },
        setLayouts: (state, action: PayloadAction<Layout[]>) => {
            const isDropping = action.payload.find(layout => layout.isDraggable);
            if (!isDropping) {
                state.layouts = action.payload.map(({h,i,w,x,y})=>({
                    h,i,w,x,y
                }));
            }
        },
        createNewElement: (state, action: PayloadAction<{ dataSource: DataSource, layout: Layout }>) => {
            state.dataSource.push(action.payload.dataSource);
            state.layouts.push(action.payload.layout);
        },
        setActiveItem(state, action: PayloadAction<string>) {
            state.activeI=action.payload;
        },
        setActivedataTargetCode(state,action:PayloadAction<DataSource>){
            const indexOfDs=state.dataSource.findIndex(ds=>ds.i==action.payload.i);
            if(indexOfDs==-1)return;
            state.dataSource[indexOfDs]=action.payload;
        },
        setFetchData(state,action){
            state.fetchData=action.payload
        },
        setFetchUrl(state,action){
            state.fetchUrl=action.payload
        },
        removeItemFromBuilderByI(state,action:PayloadAction<string>){
            state.layouts=state.layouts.filter(l=>l.i!==action.payload)
            state.dataSource=state.dataSource.filter(ds=>ds.i!==action.payload)
        },
    }
});


/* Types */
  export type DataSource ={
    i:string;
    type: 'text:dynamic'|'hidden_'|'text:static';
    dataTargetCode?: string;
    data?: string;
  }
// -------------------------------------------------------  
export interface StaticPageSliceState {
    layouts: Layout[];
    dataSource: DataSource[];
    status: 'idle' | 'loading' | 'failed';
    activeI?: string;
    fetchData?:any;
    fetchUrl?:string;
}