## Getting Started

This programming test requires you to write a program in any language, using any support library. The only restriction is that it CANNOT use any online services during its runtime.

There are several problems, each will build on the previous one.

## Folder Structure

The program must listen on a stream UNIX domain socket (AF_UNIX & SOCK_STREAM) and act as a server. The path to this socket is given as the first argument to the program as seen in the shell command above.

Other programs can connect to this socket as clients and exchange messages with your program.

We define the communication protocol as follow:

- Each message is a JSON object contained in a single line.
- Every message is terminated with the new line character \n (ASCII: 10).
- Every message from a client is called a request.
- Every message from the server is a response to a request previously sent by a client.
- Every request must have these attributes:
    a. id is an arbitrary string or number.
    b. method is a string that indicates which type of request it is.
    c. params is a JSON object that contains the parameters for the request. All questions will refer to attributes in this object as "parameters" for the method.
- A response from the server must have these attributes:
    a. id: identify which request it is for.
    b. result: A JSON object that contains the responses for the corresponding request.
- A client can send many requests concurrently and the server does not have to reply to them in order. This is because we can pair a response with a request using the id attribute.
- A server will NEVER be expected to respond to an invalid message. It is allowed to disconnect when a client sends something invalid.
For this problem, implement only the request type: echo. For this message type, the request will also contains the param message which is an arbitrary string. The server's response must contain:

- message: The same content as the message attribute in the request.
For example, given the request: {"id": 42, "method": "echo", "params": {"message": "Hello"}}. The correct response is: {"id": 42, "result": {"message": "Hello"}}.

## Dependency Management

The `Dev-Test` view allows you to manage your dependencies. More details can be found [here](https://hub.docker.com/r/nubelacorp/dev-test).
