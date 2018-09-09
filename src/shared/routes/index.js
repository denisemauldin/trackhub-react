import Home from "connected/Home"
import DisplayTrackhub from "connected/DisplayTrackhub"
import TrackhubList from "../components/connected/TrackhubList";

const globalRoutes = [
  {
    path: "/trackhublist",
    component: TrackhubList
  },
  {
    path: "/trackhub",
    component: DisplayTrackhub
  },
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
