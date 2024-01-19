import {  userActionTypes, userType } from "@/types/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

const INITIAL_STATE = {
    name: null,
    userName: null,
    email: null,
    phone: null,
    role: null,
    id: null
}

export const userAuthStore = create(persist<userType & userActionTypes>((set, get) => ({
    name: INITIAL_STATE.name,
    userName: INITIAL_STATE.userName,
    email: INITIAL_STATE.email,
    phone: INITIAL_STATE.phone,
    role: INITIAL_STATE.role,
    id: INITIAL_STATE.id,

    logIn(user: userType) {
        set(() => ({
            name: user.name,
            userName:user.userName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            id: user.id
        }));
    },
    logOut(user: null) {
        set(() => ({
            name: user,
            userName:user,
            email: user,
            phone: user,
            role: user,
            id: user
        }))
    },
}), { name: "cart", skipHydration: true }))  //we need to skip hydration to prevent hydration error as in the beginning nextjs is trying to change component type as we are using client side component