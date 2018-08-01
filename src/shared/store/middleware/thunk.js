function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument)
    }


    return next(action)
  }
}

const thunkMiddleware = createThunkMiddleware()
thunkMiddleware.withExtraArgument = createThunkMiddleware

export default thunkMiddleware