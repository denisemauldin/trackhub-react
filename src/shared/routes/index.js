import Home from "connected/Home"
import TrackhubGenerator from "connected/TrackhubGenerator/TrackhubGenerator"
import ReviewTrackhub from "../components/connected/ReviewTrackhub";

const globalRoutes = [
  {
    path: "/generate",
    component: TrackhubGenerator
  },
  {
    path: "/trackhubs",
    component: ReviewTrackhub
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
