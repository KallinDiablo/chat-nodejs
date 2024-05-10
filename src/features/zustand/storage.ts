import { create } from 'zustand'

interface storage{
    profile:{}
    setProfile: (data:{})=>void
}
export const useStorage = create<storage>((set)=>({
    profile:{},
    setProfile: (data:{}) =>set((state)=>({profile:state.profile=data}))
}))