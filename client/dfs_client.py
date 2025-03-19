import grpc
import sys
import os

# Ensure Python finds the generated gRPC files
sys.path.append(os.path.abspath("grpc_proto"))

import dfs_pb2
import dfs_pb2_grpc

def run():
    # Connect to gRPC server
    channel = grpc.insecure_channel("localhost:50051")
    stub = dfs_pb2_grpc.DFSServiceStub(channel)

    # Test StoreChunk RPC
    response = stub.StoreChunk(dfs_pb2.StoreChunkRequest(
        file_id=1, chunk_index=0, chunk_data=b"Hello, DFS!", checksum="abc123"
    ))
    print("StoreChunk Response:", response)

    # Test RetrieveChunk RPC
    response = stub.RetrieveChunk(dfs_pb2.RetrieveChunkRequest(
        file_id=1, chunk_index=0
    ))
    print("RetrieveChunk Response:", response)

if __name__ == "__main__":
    run()
