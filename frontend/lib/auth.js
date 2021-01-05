// ! Get the ID out of the token
export function getUserId() {
  // ! Get the token
  const token = localStorage.getItem('token')
  // ! Handle it when there's no token available
  if (!token) return false

  // ! Split, decode, and parse the string
  const parsedToken = JSON.parse(atob(token.split('.')[1]))
  return parsedToken.sub
}

export function isCreator(compareId) {
  if (!compareId) return false
  return getUserId() === compareId
}
