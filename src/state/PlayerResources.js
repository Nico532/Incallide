import React from 'react'
import { atom, selector } from 'recoil'

export const recoilEnergy = atom({
    key: 'energy',
    default: 0,
})

export const recoilSession = atom({
    key: 'session',
    default: null,
})