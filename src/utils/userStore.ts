"use client"
import { fullUserType, userActionTypes } from "@/types/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

const INITIAL_STATE = {
    name: null,
    userName: null,
    email: null,
    phone: null,
    role: null,
    id: null,
    address:{

    },
    emailVerified: null,
    phoneVerified: null,
    activeSession: false,
    image: null,
}

export const userAuthStore = create(persist<fullUserType & userActionTypes>((set, get) => ({
    name: INITIAL_STATE.name,
    userName: INITIAL_STATE.userName,
    email: INITIAL_STATE.email,
    phone: INITIAL_STATE.phone,
    role: INITIAL_STATE.role,
    id: INITIAL_STATE.id,
    address: INITIAL_STATE.address,
    emailVerified: INITIAL_STATE.emailVerified,
    phoneVerified: INITIAL_STATE.phoneVerified,
    activeSession: INITIAL_STATE.activeSession,
    image: INITIAL_STATE.image,

    logIn(user: fullUserType) {
        set(() => ({
            name: user.name,
            userName: user.userName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            id: user.id,
            address: user.address,
            emailVerified:user.emailVerified,
            phoneVerified:user.phoneVerified,
            activeSession:user.activeSession,
            image:user.image,
        }));
    },
    logOut(user: null) {
        set(() => ({
            name: user,
            userName: user,
            email: user,
            phone: user,
            role: user,
            id: user,
            emailVerified:null,
            phoneVerified:null,
            activeSession:false,
            image:null,
        }))
    },
}), { name: "user", skipHydration: true }))  //we need to skip hydration to prevent hydration error as in the beginning nextjs is trying to change component type as we are using client side component