import json
import socket

def process_request(request):
    if 'method' not in request or 'params' not in request:
        return None

    method = request['method']
    params = request['params']

    if method == 'echo' and 'message' in params:
        message = params['message']
        response = {
            'id': request['id'],
            'result': {'message': message}
        }
        return response

    return None

def handle_client_request(client_socket):
    try:
        data = client_socket.recv(4096)
        if not data:
            return
        request = json.loads(data)
        response = process_request(request)
        if response:
            client_socket.sendall(json.dumps(response).encode('utf-8') + b'\n')
    except (ValueError, KeyError):
        return
    finally:
        client_socket.close()

def start_server(socket_path):
    server_socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    server_socket.bind(socket_path)
    server_socket.listen(1)

    while True:
        client_socket, _ = server_socket.accept()
        handle_client_request(client_socket)

if __name__ == '__main__':
    socket_path = '/path/to/socket'  # Replace with the actual socket path
    start_server(socket_path)
