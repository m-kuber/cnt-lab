#include <iostream>
#include <fstream>
#include <cstring>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080
#define BUFFER_SIZE 1024

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
    address.sin_port = htons(PORT);

    if (bind(server_fd, (sockaddr*)&address, sizeof(address)) < 0) {
        perror("Bind failed");
        return 1;
    }

    if (listen(server_fd, 1) < 0) {
        perror("Listen failed");
        return 1;
    }

    std::cout << "Server listening on port " << PORT << "..." << std::endl;

    new_socket = accept(server_fd, (sockaddr*)&address, (socklen_t*)&addrlen);
    if (new_socket < 0) {
        perror("Accept failed");
        return 1;
    }

    std::ifstream file("send.txt", std::ios::binary);
    if (!file) {
        perror("File open failed");
        return 1;
    }

    char buffer[BUFFER_SIZE];
    while (!file.eof()) {
        file.read(buffer, BUFFER_SIZE);
        std::streamsize bytesRead = file.gcount();

        if (bytesRead > 0) {
            // Display file contents to terminal
            std::cout.write(buffer, bytesRead);
            std::cout.flush();

            // Send data to client
            if (send(new_socket, buffer, bytesRead, 0) == -1) {
                perror("Send failed");
                break;
            }
        }
    }

    std::cout << "\n\nFile sent successfully." << std::endl;

    file.close();
    close(new_socket);
    close(server_fd);

    return 0;
}
