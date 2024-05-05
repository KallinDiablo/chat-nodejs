import { create } from 'zustand'

interface storage{
    redirectToSignIn:boolean
    setRedirectToSignIn: (data:boolean)=>void
}
export const useStorage = create<storage>((set)=>({
    redirectToSignIn:false,
    setRedirectToSignIn: (data:boolean) =>set((state)=>({redirectToSignIn:state.redirectToSignIn=data}))
}))