import Home from "connected/Home"

const globalRoutes = [
  {
    path: "/",
    component: Home
  }
]

export default function getRoutes(userPermissions = {}) {
  let routes = []

  /*
  if (userPermissions.approve_talendesignorder) {
    globalRoutes.unshift({
      path: "/approve-talens",
      exact: true,
      component: ApproveTalens
    })
  }
  */

  return globalRoutes
}
