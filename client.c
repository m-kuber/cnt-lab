#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>

#define PORT 8080
#define BUF_SIZE 1024

int main() {
    int sockfd;
    char buffer[BUF_SIZE];
    struct sockaddr_in servaddr;
    socklen_t len = sizeof(servaddr);

    // Create socket
    if ((sockfd = socket(AF_INET, SOCK_DGRAM, 0)) < 0) {
        perror("socket creation failed");
        exit(EXIT_FAILURE);
    }

    // Server info
    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(PORT);
    servaddr.sin_addr.s_addr = INADDR_ANY;  // localhost

    // Send hello
    char *hello = "Hello Server!";
    sendto(sockfd, hello, strlen(hello), 0, (const struct sockaddr *)&servaddr, len);
    printf("Sent to server: %s\n", hello);

    // Receive response
    int n = recvfrom(sockfd, buffer, BUF_SIZE, 0, (struct sockaddr *)&servaddr, &len);
    buffer[n] = '\0';
    printf("Server says: %s\n", buffer);

    close(sockfd);
    return 0;
}
