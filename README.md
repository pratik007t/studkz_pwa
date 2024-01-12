# RUN DOCKER

# For Development
    `
        docker build -f Dockerfile.dev -t <name:tag> .
        docker run -it -p 4001:3000 studkz/studkz_pwa
    `

# For Production
    `
         docker build -t studkz/studkz_pwa ..
        docker run -it -p 4001:3000 studkz/studkz_pwa
    `
# for node version
`
 node varsion 16.13.1
`

# for project run
`
npm start
`