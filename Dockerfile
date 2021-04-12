FROM node:14

LABEL maintainer="Kris"

RUN mkdir /opt/nodeapp
RUN chown -R node:node /opt/nodeapp

COPY . /opt/nodeapp
RUN chown node:node /opt/nodeapp/package.json /opt/nodeapp/config

USER node
WORKDIR /opt/nodeapp

RUN yarn install

EXPOSE 8300

ENTRYPOINT ["yarn"]
CMD ["start"]
