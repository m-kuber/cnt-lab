#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <math.h>

#define PORT 9090
#define BUF_SIZE 1024

int main() {
    int sockfd;
    char buffer[BUF_SIZE];
    struct sockaddr_in servaddr, cliaddr;
    socklen_t len = sizeof(cliaddr);

    // Create socket
    if ((sockfd = socket(AF_INET, SOCK_DGRAM, 0)) < 0) {
        perror("socket creation failed");
        exit(EXIT_FAILURE);
    }

    // Server info
    memset(&servaddr, 0, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = INADDR_ANY;
    servaddr.sin_port = htons(PORT);

    // Bind
    if (bind(sockfd, (const struct sockaddr *)&servaddr, sizeof(servaddr)) < 0) {
        perror("bind failed");
        close(sockfd);
        exit(EXIT_FAILURE);
    }

    printf("UDP Calculator Server listening on port %d...\n", PORT);

    // Receive request
    int n = recvfrom(sockfd, buffer, BUF_SIZE, 0, (struct sockaddr *)&cliaddr, &len);
    buffer[n] = '\0';
    printf("Client request: %s\n", buffer);

    double result = 0.0;
    if (strcmp(buffer, "sin 30") == 0) {
        result = sin(30 * M_PI / 180.0);  // Convert to radians
    }

    char reply[BUF_SIZE];
    snprintf(reply, sizeof(reply), "Result: %f", result);

    // Send result
    sendto(sockfd, reply, strlen(reply), 0, (struct sockaddr *)&cliaddr, len);

    close(sockfd);
    return 0;
}
