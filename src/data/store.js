import { configureStore } from '@reduxjs/toolkit'
import Reducter from './Reducer'

export const store = configureStore({
  reducer: {
    TodoData:Reducter
  },
})

