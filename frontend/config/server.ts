const dev = process.env.NODE_ENV !== 'production'

// TODO: Change the serverSource to your server's IP address or domain name
const serverSource = dev ? 'http://127.0.0.1:1337' : 'https://mywebsite.com' // ?

export const server = `${serverSource}/api` // ??

// ? We are using 127.0.0.1 instead of localhost to prevent a strapi fetch error
// ?? /api is the default strapi endpoint
