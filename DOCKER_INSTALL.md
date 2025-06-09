# JSE-CORE Docker Image TODO

https://hub.docker.com/r/jenkins/jenkins
sha256:9becce9e64da749e5fcab730c88445d21fdcf6ce1a416f4e0a42273b09b4ac21

As root;

Also these commands might come in handy;

On Windows in Git Bash;

```
docker ps
winpty docker exec -it -u root <containerId/> bash
winpty docker exec -it -u root 5ca973c2d49b bash
```

On Max Os or other Unix

```
docker ps
docker exec -it -u root <containerId/> bash
```

Then

```
cat /var/jenkins_home/secrets/initialAdminPassword
```

Then install other stuff

```
cd opt
mkdir nvm
export NVM_DIR=/opt/nvm  && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
groupadd all
chgrp  all /opt/nvm
// get the group id for all
getent group all
chgrp -R all /root/.nvm/versions/node
usermod --append --groups all jenkins
id
getent group | grep jenkins
npm update -g npm


//install bun
curl -fsSL https://bun.sh/install | bash

```