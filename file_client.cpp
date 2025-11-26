#include <iostream>
#include <fstream>
#include <cstring>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080
#define BUFFER_SIZE 1024

int main() {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
        perror("Socket creation error");
        return 1;
    }

    sockaddr_in serv_addr;
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);

    if (inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr) <= 0) {
        perror("Invalid address");
        return 1;
    }

    if (connect(sock, (sockaddr*)&serv_addr, sizeof(serv_addr)) < 0) {
        perror("Connection failed");
        return 1;
    }

    std::ofstream file("received.txt", std::ios::binary);
    if (!file) {
        perror("File create failed");
        return 1;
    }

    char buffer[BUFFER_SIZE];
    ssize_t bytesReceived;
    while ((bytesReceived = read(sock, buffer, BUFFER_SIZE)) > 0) {
        // Save to file
        file.write(buffer, bytesReceived);

        // Display to terminal
        std::cout.write(buffer, bytesReceived);
        std::cout.flush();
    }

    std::cout << "\n\nFile received successfully." << std::endl;

    file.close();
    close(sock);

    return 0;
}
