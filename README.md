# calculator-end-to-end-test-js
Calculator End To End Testing with Cypress, Testcontainers, Cucumber

1-Dockerfile must build for upgrading jenkins    (For docker-compose sh)
    
    docker build -t myjenkins .

2-You must run jenkins image 
    
    docker run -p 81:8080 -p 50000:50000 --name myjenkins --privileged=true -v /var/run/docker.sock:/var/run/docker.sock -v /usr/local/bin/docker:/usr/local/bin/docker myjenkins
3- Docker and NodeJS plugin added on Jenkins

4- You must change permission for docker.sock 
    
    a- Firstly, You must connect image as a root user.
        docker exec -it -u root myjenkins /bin/bash
    b- Secondly, You can see docker.sock permissions
        ls -lrth /var/run/docker.sock
    c- Finally, You must change permission.
        chmod 666 /var/run/docker.sock
                  

