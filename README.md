Distributed File System (DFS) with Fault Tolerance
Overview
This project implements a Distributed File System (DFS) with Fault Tolerance using Python, C++, gRPC, and PostgreSQL. The system supports file chunking, replication, inter-node communication, and monitoring. It is designed to be scalable, resilient, and efficient.

Features
File Chunking: Splits large files into smaller chunks.
Replication: Ensures fault tolerance by storing each chunk on three different nodes.
gRPC Communication: Uses gRPC for inter-node messaging.
Metadata Storage: PostgreSQL is used to track file metadata, chunks, and node information.
Monitoring & Logging: Integrated with Prometheus & Grafana.
CLI-Based Interface: Users interact with the DFS through a command-line interface.
Tech Stack
Programming Languages: Python (for gRPC), C++ (for performance-critical parts)
Database: PostgreSQL
RPC Framework: gRPC
Monitoring Tools: Prometheus & Grafana
Development Environment: WSL (Windows Subsystem for Linux) or native Linux
System Architecture
Client sends file upload/download requests.
Metadata Server tracks file chunks and node locations.
Storage Nodes store chunks and replicate them for fault tolerance.
gRPC Communication ensures efficient and scalable inter-node communication.
PostgreSQL Database maintains metadata consistency.
Monitoring Tools provide real-time insights into system performance.
Installation
Prerequisites
Python 3.x
C++ Compiler
PostgreSQL
gRPC & Protocol Buffers
Prometheus & Grafana (for monitoring)
Setup Instructions
Clone the repository:
git clone https://github.com/suyashpundir/Distributed-File-System.git
cd Distributed-File-System
Set up the virtual environment & dependencies:
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
Setup PostgreSQL database:
psql -U postgres -c "CREATE DATABASE dfs_db;"
psql -U postgres -d dfs_db -f db/schema.sql
Compile and run the gRPC services:
python -m grpc_tools.protoc -I./grpc_proto --python_out=./grpc_proto --grpc_python_out=./grpc_proto grpc_proto/dfs.proto
python server/dfs_server.py
Run the client:
python client/dfs_client.py
Usage
Upload a File:
python client/dfs_client.py --upload file.txt
Download a File:
python client/dfs_client.py --download file.txt
Monitor Performance:
prometheus & grafana-server
Roadmap
Implement access control and authentication.
Optimize chunk placement algorithms.
Improve fault recovery mechanisms.
Add cloud storage integration (AWS S3).
Contribution
Contributions are welcome! Please open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Author
Suyash Pundir

Bhavesh Rajput

Shaurya Singh

