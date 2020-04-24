
import { Action, Location } from 'history'
import { match, RouteComponentProps, RouteProps } from 'react-router'

interface RoutesList extends RouteProps {
  routes?: RoutesList[]
}

interface RouteParams {
  routes: RoutesList[]
  action: Action
  location: Location
}

interface RouteChildProps extends RouteComponentProps {
  computedMatch: match<any>
}

export function patchRoutes(routes: RoutesList[]) { }
export function render(oldRender: () => Promise<void>) {
  oldRender()
}
export function onRouteChange(params: RouteParams) {

}
export function rootContainer(container: React.ComponentElement<any, any>) {
  return container
}

