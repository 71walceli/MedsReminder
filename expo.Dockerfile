FROM node:lts-jod

# Install expo-cli globally
RUN npm install -g expo-cli

# Set the working directory
WORKDIR /app

ARG UID
ARG GID
ARG USERNAME=expo
# Create a user with the specified UID and GID
RUN groupadd -g ${GID} ${USERNAME} \
    && useradd ${USERNAME} -u ${UID} -g ${GID} -m -s /bin/bash \
    && chown -R ${UID}:${GID} /home/${USERNAME}

# Add sudo support
RUN apt-get update && apt-get install -y sudo \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && echo "${USERNAME} ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

USER ${USERNAME}

