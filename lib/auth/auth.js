import { useSession } from "next-auth/react"
import { getDisplays } from "../../actions/display"

// eslint-disable-next-line react/display-name
export const withSession = (Component) =>  (props) => { 

    const session = useSession()
    let displayId = null
    const host = ''

    if (!displayId) {
        const displayList = getDisplays(host)
        //displayId = displayList[0]._id
    }

    // if the component has a render property, we are good
    if (Component.prototype.render) {
      return <Component session={session} {...props} />
    }
  
    // if the passed component is a function component, there is no need for this wrapper
    throw new Error(
      [
        "You passed a function component, `withSession` is not needed.",
        "You can `useSession` directly in your component.",
      ].join("\n")
    )
  }