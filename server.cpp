#include <iostream>
#include <cstring>
#include <unistd.h>
#include <arpa/inet.h>

int main() {
    int server_fd, new_socket;
    sockaddr_in address;
    int addrlen = sizeof(address);

    server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == -1) {
        perror("Socket failed");
        return 1;
    }

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(8080);

    if (bind(server_fd, (sockaddr*)&address, sizeof(address)) < 0) {
        perror("Bind failed");
        return 1;
    }

    if (listen(server_fd, 1) < 0) {
        perror("Listen failed");
        return 1;
    }

    std::cout << "Server listening on port 8080..." << std::endl;

    new_socket = accept(server_fd, (sockaddr*)&address, (socklen_t*)&addrlen);
    if (new_socket < 0) {
        perror("Accept failed");
        return 1;
    }

    char buffer[1024] = {0};
    read(new_socket, buffer, 1024);
    std::cout << "Received: " << buffer << std::endl;

    const char* reply = "Hello from server!";
    send(new_socket, reply, strlen(reply), 0);

    close(new_socket);
    close(server_fd);

    return 0;
}
