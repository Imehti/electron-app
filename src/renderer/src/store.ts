import { configureStore } from "@reduxjs/toolkit";
import { sidebarReducer } from "./features/sidebarSlice";
import { panelChildReducer } from "./features/panelChildSclice";
import { panelReducer } from "./features/panelSlice";
import { citiesReducer } from "./features/citiesSlice";
import { provincesReducer } from "./features/provincesSlice";


export const store=configureStore({
    reducer:{
        sidebar:sidebarReducer,
        panelChild:panelChildReducer,
        panel:panelReducer,
        cities:citiesReducer,
        provinces:provincesReducer
    }
})

export type ApplicationState=ReturnType<typeof store.getState>

export type ApplicationDispatch = typeof store.dispatch