export default async function ({store}) {
  console.log('auth executed')
  console.log()
  const hasRegistered = store.state.hasRegistered
  const isRoot = window.location.pathname === "/"
  if(!hasRegistered && !isRoot) {
    window.location = "/"
    return
  }
}
