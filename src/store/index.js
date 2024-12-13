import { configureStore } from '@reduxjs/toolkit'
import requestSlice from './slices/RequestSlice'

export default configureStore({
  reducer: {
    posts: requestSlice
	}
})