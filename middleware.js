export { default } from "next-auth/middleware"

//Pages need authentification
export const config = { matcher: ["/layout", '/preview','/slideshows', '/slideshow/', '/screens'] }